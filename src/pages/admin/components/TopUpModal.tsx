// @ts-nocheck
import { ChangeEvent, FormEvent, useState } from "react";
import Modal from "./Modal";
import Input from "./InputModal";
import { manipWithFetch } from "@/lib/fetch";
import { toast } from "react-toastify";
import useBalance from "@/hooks/useBalance";

interface TopupFormState {
  source_of_funds_id: string | undefined;
  amount: number | undefined;
}

const TopUpModal = ({ setIsOpen }) => {
  const [formData, setFormData] = useState<TopupFormState>({
    source_of_funds_id: "Balance",
    amount: undefined,
  });

  const { currentUser, refetchBalance } = useBalance();

  const handleFormInputChange = (
    e: ChangeEvent<HTMLInputElement>,
    fieldName: string
  ) => {
    setFormData((prevState) => {
      let value: number | string = e.target.value;
      if (e.target.type === "number") {
        value = parseInt(value);
      }
      return { ...prevState, [fieldName]: value };
    });
  };

  const handleTransferSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await manipWithFetch(
        `users/${currentUser?.id}`,
        {
          balance: currentUser?.balance + formData.amount,
        },
        "PATCH"
      );

      toast.success("Topup successful!", {
        position: "top-center",
        autoClose: 3000,
      });

      setIsOpen(false);
      refetchBalance();
    } catch (error) {
      toast.error(error.message, {
        position: "top-center",
        autoClose: 3000,
      });
    }
  };

  const handleNominalChange = (nominal: number) => {
    setFormData((prevState) => ({ ...prevState, amount: nominal }));
  };

  return (
    <Modal setIsOpen={setIsOpen} submitHandler={handleTransferSubmit}>
      <div className="flex justify-between items-center">
        <span className="font-bold">Top Up Balance</span>
        <button onClick={() => setIsOpen(false)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="25"
            width="20"
            viewBox="0 0 384 512"
            className="cursor-pointer"
          >
            <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" />
          </svg>
        </button>
      </div>
      <div className="flex flex-col gap-5">
        <div>
          <select
            id="source_of_funds"
            name="source_of_funds"
            value={formData.source_of_funds_id}
            onChange={(e) => handleFormInputChange(e, "source_of_funds_id")}
            className="bg-zinc-200 rounded py-5 w-full px-2 "
          >
            <option value="Credit Card">Credit Card</option>
            <option value="Cash">Cash</option>
          </select>
        </div>
        <Input
          placeholder="Enter amount here"
          inputType="number"
          fieldName="amount"
          value={formData.amount}
          handleChange={handleFormInputChange}
        />

        <div>
          <p className="text-center py-2">Or select a default nominal</p>
          <div className="flex gap-5">
            <label className="bg-zinc-200 rounded-lg py-2 px-5">
              <input
                type="radio"
                name="nominal"
                value={50000}
                checked={formData.amount === 50000}
                onChange={() => handleNominalChange(50000)}
                className="mx-2"
              />
              $50,000
            </label>
            <label className="bg-zinc-200 rounded-lg py-2 px-5">
              <input
                type="radio"
                name="nominal"
                value={100000}
                checked={formData.amount === 100000}
                onChange={() => handleNominalChange(100000)}
                className="mx-2"
              />
              $100,000
            </label>
            <label className="bg-zinc-200 rounded-lg py-2 px-5">
              <input
                type="radio"
                name="nominal"
                value={150000}
                checked={formData.amount === 150000}
                onChange={() => handleNominalChange(150000)}
                className="mx-2"
              />
              $150,000
            </label>
          </div>
        </div>

        <button
          type="submit"
          className="bg-zinc-600 py-2 rounded-lg text-white"
        >
          Submit
        </button>
      </div>
    </Modal>
  );
};

export default TopUpModal;
