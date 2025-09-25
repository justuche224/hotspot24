import { SectionProps } from '@/types/SectionProps'
import React from 'react'

const AboutSection = ({className}:SectionProps) => {
  return (
    <section id="about" className={className}>
      <div className='grid grid-cols-2 h-full'>
        <div className="bg-[url('/assets/about.jpg')] bg-center bg-no-repeat bg-cover"></div>
        <div className="p-24">
          <h1 className="mb-4">Welcome to <span className=" text-primary">Hotpot 24</span></h1>
          <div className='text-gray-300'>
            <p className='mb-4'>
              At Hotpot 24, our story is a delightful journey of passion and flavor.
              It all began with a love for crafting the perfect dishes, blending tradition with innovation.
              Our chefs, inspired by the rich culinary heritage of Nigeria, handpick the finest ingredients
              to create mouthwatering masterpieces. From our artisanal broth to the delectable ingredients,
              each dish tells a tale of dedication and quality.
            </p>
            <p>
              With a commitment to excellence, we&apos;ve built a community that cherishes every dish.
              Join us on this gastronomic adventure, where every order is a chapter in our story—a story of taste,
              tradition, and the joy of sharing exceptional food.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default AboutSection