import { Button, Image, Link } from "@nextui-org/react";
import SlideBackground from "./SlideBackground";
import { SectionProps } from "@/types/SectionProps";

const HomeSlider = ({ className }: SectionProps) => {
  return (
    <section className={className}>
      <div
        data-hs-carousel='{"loadingClasses": "opacity-0", "isAutoPlay": true}'
        className="relative min-h-[100svh] h-screen z-0"
      >
        <div className="hs-carousel relative overflow-hidden w-full h-full">
          <div className="hs-carousel-body w-full absolute top-0 bottom-0 start-0 flex flex-nowrap duration-700 ease-in-out delay-200 opacity-0">
            {/*First Slide*/}
            <SlideBackground bgImage={"/assets/slider_bg_1.jpg"}>
              <div className="w-full flex flex-col justify-center text-center h-full absolute z-10">
                <span className="font-nothingYouCouldDo text-primary text-2xl md:text-4xl lg:text-5xl mb-2 md:mb-4">
                  Welcome
                </span>
                <h1 className="mb-4 md:mb-8 text-2xl md:text-4xl lg:text-5xl">
                  Hotpot 24 - 24/7 Food Delivery in Lekki
                  <span className="block">Lekki&apos;s Fastest Delivery</span>
                </h1>
                <h3 className="mb-8 md:mb-16 text-base md:text-lg lg:text-xl">
                  Treat yourself to our exquisite cuisine, where every dish
                  tells a story!
                </h3>
                <p>
                  <Button
                    as={Link}
                    href="/branches"
                    color="primary"
                    radius="none"
                    size="lg"
                    className="py-3 md:py-4 px-4 md:px-6 text-dark"
                  >
                    Order Now
                  </Button>
                  <Button
                    as={Link}
                    href="/branches"
                    radius="none"
                    size="lg"
                    className="bg-transparent border-2 py-3 md:py-4 px-4 md:px-6 ml-2 md:ml-4"
                  >
                    View Branches
                  </Button>
                </p>
              </div>
            </SlideBackground>

            {/*Second Slide*/}
            <SlideBackground bgImage={"/assets/slider_bg_2.jpg"}>
              <div className="w-full flex flex-col md:flex-row gap-4 md:gap-6 justify-center items-center h-full absolute z-10 px-4">
                <div className="w-full md:w-1/4 max-w-xs">
                  <Image src="/assets/jollof-rice4253.png" alt="" />
                </div>
                <div className="max-w-xl text-center md:text-start md:ml-0">
                  <span className="font-nothingYouCouldDo text-primary text-2xl md:text-4xl lg:text-5xl mb-2 md:mb-4">
                    Delicious
                  </span>
                  <h1 className="mb-4 md:mb-8 text-2xl md:text-4xl lg:text-5xl">
                    Nigerian Cuisine
                  </h1>
                  <h3 className="mb-8 md:mb-16 text-base md:text-lg lg:text-xl">
                    No stress, no hassle, just delicious food delivered to your
                    doorstep.
                  </h3>
                  <p>
                    <Button
                      as={Link}
                      href="/branches"
                      color="primary"
                      radius="none"
                      size="lg"
                      className="py-3 md:py-4 px-4 md:px-6 text-dark"
                    >
                      Order Now
                    </Button>
                    <Button
                      as={Link}
                      href="/branches"
                      radius="none"
                      size="lg"
                      className="bg-transparent border-2 py-3 md:py-4 px-4 md:px-6 ml-2 md:ml-4"
                    >
                      View Branches
                    </Button>
                  </p>
                </div>
              </div>
            </SlideBackground>

            {/*Third Slide*/}
            <SlideBackground bgImage={"/assets/slider_bg_2.jpg"}>
              <div className="w-full flex flex-col-reverse md:flex-row gap-4 md:gap-6 justify-center items-center h-full absolute z-10 px-4">
                <div className="max-w-xl text-center md:text-end md:mr-0">
                  <span className="font-nothingYouCouldDo text-primary text-2xl md:text-4xl lg:text-5xl mb-2 md:mb-4">
                    Delicious
                  </span>
                  <h1 className="mb-4 md:mb-8 text-2xl md:text-4xl lg:text-5xl">
                    Anytime, Anywhere
                  </h1>
                  <h3 className="mb-8 md:mb-16 text-base md:text-lg lg:text-xl">
                    We are available 24/7, so you can order anytime, anywhere.
                  </h3>
                  <p>
                    <Button
                      as={Link}
                      href="/branches"
                      color="primary"
                      radius="none"
                      size="lg"
                      className="py-3 md:py-4 px-4 md:px-6 text-dark"
                    >
                      Order Now
                    </Button>
                    <Button
                      as={Link}
                      href="/branches"
                      radius="none"
                      size="lg"
                      className="bg-transparent border-2 py-3 md:py-4 px-4 md:px-6 ml-2 md:ml-4"
                    >
                      View Branches
                    </Button>
                  </p>
                </div>
                <div className="w-full md:w-1/4 max-w-xs">
                  <Image src="/assets/chicken-nuggets6784.png" alt="" />
                </div>
              </div>
            </SlideBackground>
          </div>
        </div>

        {/*Indicator buttons*/}
        <div className="hs-carousel-pagination flex justify-center absolute bottom-3 start-0 end-0 space-x-3">
          <span className="hs-carousel-active:bg-white hs-carousel-active:border-none w-[18px] h-[18px] border-2 border-gray-400 rounded-full cursor-pointer flex items-center justify-center">
            <span className="hs-carousel-active:bg-white hs-carousel-active:border-gray-500 w-3 h-3 border border-gray-400 rounded-full cursor-pointer "></span>
          </span>
          <span className="hs-carousel-active:bg-white hs-carousel-active:border-none w-[18px] h-[18px] border-2 border-gray-400 rounded-full cursor-pointer flex items-center justify-center">
            <span className="hs-carousel-active:bg-white hs-carousel-active:border-gray-500 w-3 h-3 border border-gray-400 rounded-full cursor-pointer "></span>
          </span>
          <span className="hs-carousel-active:bg-white hs-carousel-active:border-none w-[18px] h-[18px] border-2 border-gray-400 rounded-full cursor-pointer flex items-center justify-center">
            <span className="hs-carousel-active:bg-white hs-carousel-active:border-gray-500 w-3 h-3 border border-gray-400 rounded-full cursor-pointer "></span>
          </span>
        </div>
      </div>
    </section>
  );
};

export default HomeSlider;
