import styles from "./Banner.module.css";

const Banner = () => {
   return (
      <div
         className={`flex items-center justify-center flex-col gap-2 h-screen  w-full ${styles.banner}`}
      >
         <h1 className="text-6xl md:text-7xl text-white drop-shadow-md   font-semibold capitalize">
            Find your <br className="md:hidden" /> best tour{" "}
         </h1>
         <h3 className="text-xl md:text-3xl font-semibold text-white">
            with the tourde.com{" "}
         </h3>
      </div>
   );
};

export default Banner;
