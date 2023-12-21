const Modal = ({ setIsOpen, children, submitHandler }) => {
  return (
    <>
      <div
        className="fixed inset-0 bg-black bg-opacity-20 z-[9999] flex items-center justify-center"
        onClick={() => setIsOpen(false)}
      ></div>
      <form
        onSubmit={submitHandler}
        className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-fadeIn z-[9999]"
      >
        <div className="bg-white text-black p-8 rounded-lg shadow-lg z-10 flex flex-col space-y-4">
          <div>
            <h2 className="text-4xl text-indigo-700">{children[0]}</h2>
          </div>
          <div className="flex flex-col text-base text-gray-700">
            {children[1]}
          </div>
          <div className="w-full">
            <div className="flex items-center">
              {/* <Button submitButton value="Submit" /> */}
              {/* <button /> */}
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default Modal;
