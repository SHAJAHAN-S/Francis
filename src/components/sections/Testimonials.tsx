import { useState, useEffect, useCallback } from 'react';
import { FiChevronLeft, FiChevronRight, FiStar } from 'react-icons/fi';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import type { Testimonial } from '../../types';

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: 'Mr. Rajkumar S.',
    role: 'Parent — Class X Student',
    content: 'St. Francis has been a second home for my son. The teachers are dedicated, and the school\'s focus on both academics and character building is commendable. My son secured 95% in his board exams thanks to the excellent coaching.',
    rating: 5,
  },
  {
    id: 2,
    name: 'Priya Lakshmi',
    role: 'Alumni — Batch of 2020',
    content: 'The values and discipline I learned at St. Francis shaped who I am today. The teachers went above and beyond to help us succeed. I\'m now pursuing engineering at Anna University, and I owe my foundation to this wonderful school.',
    rating: 5,
  },
  {
    id: 3,
    name: 'Mrs. Kavitha M.',
    role: 'Parent — Class VI Student',
    content: 'We are extremely happy with the holistic education our daughter receives here. The extracurricular activities, sports programs, and cultural events have helped her develop confidence and leadership skills.',
    rating: 5,
  },
  {
    id: 4,
    name: 'Arun Kumar D.',
    role: 'Alumni — Batch of 2018',
    content: 'St. Francis gave me the best memories of my life. The science exhibitions, sports days, and cultural events were the highlights. The teachers are like family — they genuinely care about every student\'s growth.',
    rating: 4,
  },
  {
    id: 5,
    name: 'Mrs. Sumathi R.',
    role: 'Parent — Class III & VIII Students',
    content: 'Having both my children study here gives me peace of mind. The school provides a safe, nurturing environment with excellent facilities. The communication between teachers and parents is outstanding.',
    rating: 5,
  },
];

export default function Testimonials() {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const { ref, isVisible } = useScrollAnimation();

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % testimonials.length);
  }, []);

  const prev = () => {
    setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(next, 5000);
    return () => clearInterval(interval);
  }, [isPaused, next]);

  return (
    <section ref={ref} className="py-20 bg-accent relative overflow-hidden">
      {/* Decorative */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full -translate-y-1/2 translate-x-1/3 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-secondary/5 rounded-full translate-y-1/2 -translate-x-1/3 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className={`transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          {/* Header */}
          <div className="text-center mb-14">
            <h2 className="section-heading">What Parents & Alumni Say</h2>
            <div className="gold-line" />
          </div>

          {/* Testimonial Carousel */}
          <div
            className="max-w-3xl mx-auto"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            <div className="relative">
              {/* Quote mark */}
              <div className="absolute -top-6 left-6 text-8xl text-secondary/20 font-display leading-none select-none">
                "
              </div>

              {/* Card */}
              <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12 relative">
                {/* Stars */}
                <div className="flex gap-1 mb-6">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <FiStar
                      key={i}
                      size={20}
                      className={i < testimonials[current].rating ? 'text-secondary fill-secondary' : 'text-gray-300'}
                    />
                  ))}
                </div>

                {/* Content */}
                <p className="text-gray-dark font-body text-lg leading-relaxed mb-8 italic">
                  "{testimonials[current].content}"
                </p>

                {/* Author */}
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-primary to-primary-light flex items-center justify-center text-white font-display font-bold text-lg">
                    {testimonials[current].name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-display font-bold text-primary text-lg">
                      {testimonials[current].name}
                    </h4>
                    <p className="text-gray-mid text-sm font-label">
                      {testimonials[current].role}
                    </p>
                  </div>
                </div>
              </div>

              {/* Navigation */}
              <div className="flex items-center justify-center gap-4 mt-8">
                <button
                  onClick={prev}
                  className="w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all"
                  aria-label="Previous testimonial"
                >
                  <FiChevronLeft size={20} />
                </button>

                {/* Dots */}
                <div className="flex gap-2">
                  {testimonials.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrent(index)}
                      className={`h-2 rounded-full transition-all duration-300 ${
                        index === current ? 'w-8 bg-secondary' : 'w-2 bg-gray-300 hover:bg-gray-400'
                      }`}
                      aria-label={`Go to testimonial ${index + 1}`}
                    />
                  ))}
                </div>

                <button
                  onClick={next}
                  className="w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all"
                  aria-label="Next testimonial"
                >
                  <FiChevronRight size={20} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
