import useBalance from "@/hooks/useBalance";
import Modal from "./Modal";

const PaymentModal = ({ setIsOpen, totalPayment, submitModal }) => {
  const { currentUser } = useBalance();

  return (
    <Modal setIsOpen={setIsOpen} submitHandler={submitModal}>
      <div className="flex justify-between items-center">
        <span className="font-bold">Payment</span>
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
        <div>Total: $ {totalPayment}</div>

        <div>Balance: $ {currentUser?.balance}</div>

        <button
          type="submit"
          className="bg-zinc-600 py-2 rounded-lg text-white"
          onClick={submitModal}
        >
          Pay
        </button>
      </div>
    </Modal>
  );
};

export default PaymentModal;
