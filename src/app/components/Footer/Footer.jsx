import Networking from "./Components/Networking";
import Information from "./Components/Information"; // Asum că ai un component Information

const Footer = () => {
    return (
        <div className="relative h-[561px] max-md:h-auto flex flex-col items-center justify-between py-10 max-md:py-0 max-md:pb-10 bg-[#191919]">
            <div className="absolute top-4 w-full"></div>
            <p className="border-t-[0.1px] border-[#A1A1A1] w-[1536px] max-md:w-auto"></p>
            <div className="mt-24 w-full flex flex-col items-center">
                <Information />
                <Networking />
            </div>
        </div>
    );
}

export default Footer;
