"use client";
import React from "react";
import { motion } from "framer-motion";

export type Testimonial = {
  text: string;
  image?: string;
  initial?: string;
  name: string;
  role: string;
  service?: string;
};

export const TestimonialsColumn = (props: {
  className?: string;
  testimonials: Testimonial[];
  duration?: number;
}) => {
  return (
    <div className={`w-full ${props.className ?? ''}`}>
      <motion.div
        animate={{ translateY: "-50%" }}
        transition={{
          duration: props.duration || 10,
          repeat: Infinity,
          ease: "linear",
          repeatType: "loop",
        }}
        className="flex flex-col gap-4 pb-4"
      >
        {[...new Array(2).fill(0).map((_, index) => (
          <React.Fragment key={index}>
            {props.testimonials.map(({ text, image, name, role, service }, i) => (
              <div
                className="p-6 rounded-2xl border border-slate-200 shadow-md shadow-slate-900/5 w-full sm:max-w-[300px] bg-white"
                key={i}
              >
                {/* Stars */}
                <div className="flex gap-0.5 mb-3">
                  {[...Array(5)].map((_, s) => (
                    <svg key={s} className="w-3 h-3 fill-orange-500 text-orange-500" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>

                <p className="text-slate-700 text-lg leading-relaxed">{text}</p>

                {service && (
                  <span className="inline-block mt-3 text-[9px] font-mono tracking-widest uppercase px-2.5 py-1 rounded-md bg-orange-50 border border-orange-200 text-orange-600">
                    {service}
                  </span>
                )}

                <div className="flex items-center gap-3 mt-4 pt-4 border-t border-orange-100">
                  <img
                    width={36}
                    height={36}
                    src={image}
                    alt={name}
                    className="h-9 w-9 rounded-full object-cover flex-shrink-0 ring-2 ring-orange-200"
                  />
                  <div className="flex flex-col">
                    <span className="font-semibold text-sm text-orange-500 leading-tight">{name}</span>
                    <span className="text-[11px] text-slate-400 leading-tight mt-0.5">{role}</span>
                  </div>
                </div>
              </div>
            ))}
          </React.Fragment>
        ))]}
      </motion.div>
    </div>
  );
};
