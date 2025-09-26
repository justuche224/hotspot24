"use client";
import { DietFoodIcon } from "@/icons/DietFoodIcon";
import { PizzaIcon } from "@/icons/PizzaIcon";
import { ScooterIcon } from "@/icons/ScooterIcon";
import { SectionProps } from "@/types/SectionProps";

const ServicesSection = ({ className }: SectionProps) => {
  return (
    <section
      className={`bg-[url('/assets/bg_wallpaper.png')] bg-repeat text-dark ${className}`}
    >
      <div className="container py-8 md:py-12">
        <div className="container max-w-4xl text-center mb-8 md:mb-10 px-4 md:px-0">
          <h1 className="font-semibold mb-4 text-2xl md:text-4xl">
            Our Services
          </h1>
          <p>
            From swift and reliable delivery to a diverse selection of healthy
            food options and authentic original recipes, we&apos;ve crafted a
            seamless experience for your cravings.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          <div className="flex flex-col gap-2 md:gap-3 text-center p-4 md:p-6">
            <div className="flex items-center text-center justify-center mb-3 md:mb-5">
              <div className="w-16 h-16 md:w-[100px] md:h-[100px] border border-dark/20 flex justify-center items-center hover:bg-light relative transition-transform duration-1000 ease-in-out hover:rotate-[225deg]"></div>
              <span className="absolute">
                <DietFoodIcon className={"w-8 md:w-16"} />
              </span>
            </div>

            <h3 className="uppercase mb-4">Healthy Food</h3>
            <div>
              Savor the goodness of guilt-free indulgence with our Healthy Food
              options, crafted to bring you a perfect blend of nutritious
              ingredients without compromising on flavor.
            </div>
          </div>
          <div className="flex flex-col gap-2 md:gap-3 text-center p-4 md:p-6">
            <div className="flex items-center text-center justify-center mb-3 md:mb-5">
              <div className="w-16 h-16 md:w-[100px] md:h-[100px] border border-dark/20 flex justify-center items-center hover:bg-light relative transition-transform duration-1000 ease-in-out hover:rotate-[225deg]"></div>
              <span className="absolute">
                <ScooterIcon className={"w-8 md:w-16"} />
              </span>
            </div>
            <h3 className="uppercase mb-4">Fast Delivery</h3>
            <div>
              Experience the unbeatable convenience of Fast Delivery as we bring
              the piping hot perfection of our pizzas straight to your doorstep.
            </div>
          </div>
          <div className="flex flex-col gap-2 md:gap-3 text-center p-4 md:p-6">
            <div className="flex items-center text-center justify-center mb-3 md:mb-5">
              <div className="w-16 h-16 md:w-[100px] md:h-[100px] border border-dark/20 flex justify-center items-center hover:bg-light relative transition-transform duration-1000 ease-in-out hover:rotate-[225deg]"></div>
              <span className="absolute">
                <PizzaIcon className={"w-8 md:w-16"} />
              </span>
            </div>
            <h3 className="uppercase mb-4">Original Recipes</h3>
            <div>
              Delight your taste buds with the authenticity of our Original
              Recipe dishes, where every slice is a celebration of timeless
              flavors and culinary expertise.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
