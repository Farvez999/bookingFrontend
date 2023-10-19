"use client";
import { useState } from "react";
import dynamic from "next/dynamic";
import InputTextBox from "../InputBox/InputTextMessage";
import Cookies from "universal-cookie";
import { usePostafeedbackMutation } from "@/redux/api/feedBackApi";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";

const Feedback = () => {
  const router = useRouter();
  const cookie = new Cookies();
  const userId = cookie.get("userId");
  const email = cookie.get("email");
  const [error, setError] = useState("");
  const [useremail, setuseremail] = useState("");
  const [feedback, setFeedback] = useState("");
  const [postfeedback, { isError }] = usePostafeedbackMutation();

  const handleSubmitFeedback = async (e: any) => {
    e.preventDefault();

    // You can handle the submission of feedback data here
    const data = {
      user: userId,
      email: email ? email : useremail,
      feedback: feedback,
    };

    const res: any = await postfeedback(data);
    console.log(res);
    if (!isError) {
      Swal.fire("Good job!", "thanks for your feedback", "success");

      setuseremail(""); // Reset email input
      setFeedback(""); // Reset feedback input
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: `${res?.error?.data?.message}`,
      });
      e.target.reset();
      // You can also send the feedback data to your server or perform other actions
    }
  };

  const handleFeedbackChange = (e: any) => {
    const value = e.target.value;
    setFeedback(value);

    // You can add any validation logic here and set the error state if needed.
    if (value.length > 100) {
      setError("Feedback is too long");
    } else {
      setError("");
    }
  };
  const handleRedirect = () => {
    router.push("/login");
  };

  return (
    <div className="grid lg:grid-cols-2 gap-4">
      <div>
        <img
          alt="feedback"
          height={300}
          width={500}
          src="https://img.freepik.com/free-vector/we-want-your-feedback-yellow-flat-background_1017-38689.jpg?size=626&ext=jpg&ga=GA1.1.137143835.1697663080&semt=sph"
        ></img>
      </div>
      <div>
        <form onSubmit={handleSubmitFeedback}>
          <div className="flex flex-col">
            <label className="font-bold pb-1">email:</label>
            <input
              className="border-2 border-gray-500 lg:w-[600px] ps-4 py-2"
              type="text"
              id="username"
              value={email ? email : useremail}
              placeholder="enter your email"
              onChange={(e) => setuseremail(e.target.value)}
            />
          </div>
          <div className="mt-4">
            <InputTextBox
              label="Feedback"
              initialValue={feedback}
              name="feedback"
              rows={8} // Set the number of rows for the textarea
              cols={40} // Set the number of columns for the textarea
              placeholder="Enter your feedback"
              onChange={handleFeedbackChange}
              error={error}
            />
          </div>
          {email && (
            <button
              type="submit"
              className="btn mt-4 btn-accent btn-md text-white"
            >
              Submit your feedback
            </button>
          )}
        </form>
        {!email && (
          <button
            onClick={handleRedirect}
            className="btn mt-4 btn-accent btn-md text-white"
          >
            Submit your feedback
          </button>
        )}
      </div>
    </div>
  );
};

export default dynamic(() => Promise.resolve(Feedback), {
  ssr: false,
});
