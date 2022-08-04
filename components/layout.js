import Navbar from "./common/navbar";
import Sidebar from "./common/sidebar";

export default function Layout({ children }) {
  return (
    <>
      <Sidebar />
      <div className="ml-auto mb-6 lg:w-[75%] xl:w-[80%] 2xl:w-[85%]">
        <Navbar />

        <div className="px-12 pt-6 ">
          <div className="  justify-center h-[70vh] border-2 border-dashed border-gray-300 rounded-xl">
            <span>{children}</span>
          </div>
        </div>
      </div>
    </>
  );
}
