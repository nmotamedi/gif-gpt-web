import '../index.css';

export function Landing({ handleClick }: { handleClick: () => void }) {
  return (
    <div className="bg-slate-100 rounded-lg border border-slate-200 py-4 w-10/12 md:w-7/12 m-auto">
      <div className="w-10/12 m-auto">
        <img
          src="https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExMDZjNDh6MzFwazY4ajQxZXJpczJ5N2R1d2NjeGQ5bTZ4d3F6YzJ2ayZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/KiMBUPZUhUg4HRV6PW/giphy.webp"
          className="w-8/12 md:w-5/12 m-auto"
        />
        <h2 className="my-5 font-suse font-semibold text-justify text-base md:text-xl text-slate-800">
          Transform your chats into something truly memorable with just the
          right GIF. Whether you're looking to add a touch of humor, emphasize a
          point, or simply keep the conversation lively, our tool helps you find
          the perfect GIF tailored to your conversation.
        </h2>
        <h2 className="text-justify my-5 font-suse font-light text-base md:text-lg">
          No more endless scrolling—get exactly what you need in seconds.
        </h2>
      </div>
      <button
        onClick={handleClick}
        className="bg-lime-600 text-slate-200 border-slate-900 border p-2 rounded-md drop-shadow-md font-new-amsterdam text-lg md:text-2xl hover:bg-lime-700 hover:drop-shadow-xl">
        ENTER
      </button>
    </div>
  );
}
