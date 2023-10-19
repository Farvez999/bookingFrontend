"use client";
import { Provider } from "react-redux";
import store from "./store";
interface ProvideProps {
   children: React.ReactNode;
}

const Providers = ({ children }: ProvideProps) => {
   return <Provider store={store}>{children}</Provider>;
};

export default Providers;
