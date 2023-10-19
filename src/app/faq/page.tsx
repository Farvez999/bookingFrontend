"use client";
import { useGetallfaqsQuery } from "@/redux/api/contentApi";
import Image from "next/image";

const FAQ = () => {
  const { data } = useGetallfaqsQuery(undefined);
  return (
    <div className="container mx-auto my-6">
      <div className="flex lg:flex-row flex-col items-center justify-around ">
        <div>
          <Image
            alt="faq"
            width={1000}
            height={200}
            src="https://img.freepik.com/free-vector/modern-question-mark-help-support-page_1017-27395.jpg?size=626&ext=jpg&ga=GA1.1.137143835.1697663080&semt=ais"
          ></Image>
        </div>
        <div className="w-[90%] py-10 flex flex-col gap-5">
          <h2 className="text-3xl font-semibold capitalize text-red-500">
            Frequently Ask Question{" "}
          </h2>
          <div className="w-full">
            {data?.map((faq: any) => (
              <>
                <div className="collapse collapse-plus bg-base-200 mb-4">
                  <input type="radio" name="my-accordion-3" />
                  <div className="collapse-title text-lg font-medium">
                    {faq?.title}
                  </div>
                  <div className="collapse-content text-sm">
                    <p>{faq?.description}</p>
                  </div>
                </div>
              </>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQ;
