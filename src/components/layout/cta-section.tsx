"use client";

import { ArrowRight, MapPin, Clock, Phone } from "lucide-react";
import Link from "next/link";
import { getBranches, Branch } from "@/lib/branches";
import { useEffect, useState } from "react";

export default function CTASection() {
  const [branches, setBranches] = useState([] as Branch[]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getBranches().then((fetchedBranches) => {
      setBranches(fetchedBranches);
      setLoading(false);
    });
  }, []);

  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.03]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(255,165,0,0.08)_1px,transparent_0)] bg-[length:80px_80px]"></div>
      </div>

      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-orange-900/5 via-transparent to-red-900/5" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Ready to Order?
          </h2>
          <p className="text-xl text-white/90 max-w-2xl mx-auto mb-8">
            Choose your nearest branch and enjoy delicious Nigerian cuisine
            delivered fresh to your door
          </p>

          <div className="inline-block">
            <Link
              href="/menu"
              className="inline-flex items-center gap-3 glass-border-enhanced bg-gradient-to-r from-orange-600/20 to-red-600/20 backdrop-blur-md text-white px-8 py-4 rounded-full font-bold text-lg shadow-2xl hover:shadow-orange-500/25 transition-all duration-300 group border-orange-500/30"
            >
              Order Now
              <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {loading ? (
            <div className="col-span-full text-center py-8">
              <p className="text-gray-400">Loading branches...</p>
            </div>
          ) : branches.length === 0 ? (
            <div className="col-span-full text-center py-8">
              <p className="text-gray-400">
                No branches available at the moment.
              </p>
            </div>
          ) : (
            branches.map((branch, index) => (
              <div
                key={index}
                className="glass-border-subtle rounded-2xl p-6 hover:border-orange-500/40 transition-all duration-300 group"
              >
                <div className="space-y-4">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-orange-500/20 rounded-lg group-hover:bg-orange-500/30 transition-colors">
                      <MapPin className="h-5 w-5 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-white">
                      {branch.name}
                    </h3>
                  </div>

                  <div className="space-y-3 text-white/90">
                    <div className="flex items-start gap-2">
                      <MapPin className="h-4 w-4 mt-1 flex-shrink-0" />
                      <span className="text-sm">{branch.address}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 flex-shrink-0" />
                      <span className="text-sm">{branch.phone}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 flex-shrink-0" />
                      <span className="text-sm font-medium">24/7</span>
                    </div>
                  </div>

                  <Link
                    href={`/branches/${branch.slug}`}
                    className="inline-flex items-center gap-2 text-white font-medium hover:text-white/80 transition-colors group/link"
                  >
                    Order Now
                    <ArrowRight className="h-4 w-4 group-hover/link:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="text-center mt-16">
          <div className="flex flex-wrap justify-center items-center gap-8 text-white/90">
            <div className="text-center">
              <div className="text-2xl font-bold">24/7</div>
              <div className="text-sm">Service Hours</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">&lt; 30min</div>
              <div className="text-sm">Average Delivery</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">4.9★</div>
              <div className="text-sm">Customer Rating</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">50+</div>
              <div className="text-sm">Locations</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
