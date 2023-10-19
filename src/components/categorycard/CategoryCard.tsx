/* eslint-disable @next/next/no-img-element */
"use client";
import Link from "next/link";
import React from "react";

const CategoryCard = () => {
  return (
    <>
      <div className="card w-96 bg-base-100 shadow-md image-full">
        <figure>
          <img
            src="https://q-xx.bstatic.com/xdata/images/xphoto/263x210/57584488.jpeg?k=d8d4706fc72ee789d870eb6b05c0e546fd4ad85d72a3af3e30fb80ca72f0ba57&o="
            alt="Shoes"
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title ">Hotels</h2>
          <p>click here for avilable hotels by catagory</p>
          <div className="card-actions justify-end">
            <Link href="/category?category=hotels">
              <button className="btn  btn-secondary text-white  ">View All</button>
            </Link>
          </div>
        </div>
      </div>

      <div className="card w-96 bg-base-100 shadow-md image-full">
        <figure>
          <img
            src="https://q-xx.bstatic.com/xdata/images/hotel/263x210/119467716.jpeg?k=f3c2c6271ab71513e044e48dfde378fcd6bb80cb893e39b9b78b33a60c0131c9&o="
            alt="Shoes"
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title ">Apartments</h2>
          <p>click here for avilalbe Apartments by catagory</p>
          <div className="card-actions justify-end">
            <Link href="/category?category=apartments">
              <button className="btn  btn-secondary text-white">View All</button>
            </Link>
          </div>
        </div>
      </div>

      <div className="card w-96 bg-base-100 shadow-md image-full">
        <figure>
          <img
            src="https://q-xx.bstatic.com/xdata/images/xphoto/263x210/45450084.jpeg?k=f8c2954e867a1dd4b479909c49528531dcfb676d8fbc0d60f51d7b51bb32d1d9&o="
            alt="Shoes"
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title ">Resorts</h2>
          <p>click here for avilalbe Resorts by catagory</p>
          <div className="card-actions justify-end">
            <Link href="/category?category=resorts">
              <button className="btn btn-secondary text-white  ">View All</button>
            </Link>
          </div>
        </div>
      </div>

      <div className="card w-96 bg-base-100 shadow-md image-full">
        <figure>
          <img
            src="https://r-xx.bstatic.com/xdata/images/hotel/263x210/100235855.jpeg?k=5b6e6cff16cfd290e953768d63ee15f633b56348238a705c45759aa3a81ba82b&o="
            alt="Shoes"
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title ">Villas</h2>
          <p>click here for avilalbe villas by catagory</p>
          <div className="card-actions justify-end">
            <Link href="/category?category=villas">
              <button className="btn btn-secondary text-white  ">View All</button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default CategoryCard;
