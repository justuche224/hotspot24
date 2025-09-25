import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { getBranches } from "@/lib/branches";
import { MapPin, Clock, Phone, Star } from "lucide-react";
import WhatsAppButton from "@/components/whatsapp-button";

const BranchesPage = async () => {
  const branches = await getBranches();

  return (
    <>
      <div className="relative w-full">
        <div className="container mx-auto px-4 py-16 relative z-10">
          {branches.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-gray-400 text-lg">
                No branches available at the moment.
              </p>
            </div>
          ) : (
            <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
              {branches.map((branch) => (
                <Card
                  key={branch.id}
                  className="glass-border bg-gray-800/20 border-gray-700 hover:border-orange-500/30 transition-all duration-300 group"
                >
                  <CardContent className="p-8 space-y-6">
                    <div className="space-y-4">
                      <div className="flex items-start justify-between">
                        <div>
                          <h2 className="text-2xl font-bold text-white mb-2">
                            {branch.name}
                          </h2>
                          <div className="flex items-center gap-2 text-gray-300">
                            <MapPin className="h-4 w-4 text-orange-400" />
                            <p className="text-sm">{branch.address}</p>
                          </div>
                        </div>
                        <div className="bg-orange-600 p-2 rounded-full">
                          <Star className="h-5 w-5 text-white fill-current" />
                        </div>
                      </div>

                      <div className="grid sm:grid-cols-2 gap-4">
                        <div className="flex items-center gap-3 p-3 glass-border-subtle rounded-lg">
                          <Clock className="h-5 w-5 text-green-400" />
                          <div>
                            <p className="text-white font-medium text-sm">
                              24/7 Open
                            </p>
                            <p className="text-gray-400 text-xs">
                              {branch.operatingHours?.days || "Monday - Sunday"}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-3 p-3 glass-border-subtle rounded-lg">
                          <Phone className="h-5 w-5 text-blue-400" />
                          <div>
                            <p className="text-white font-medium text-sm">
                              WhatsApp
                            </p>
                            <p className="text-gray-400 text-xs">
                              {branch.whatsappNumber || branch.whatsapp}
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <h3 className="text-white font-semibold">
                          Delivery Coverage
                        </h3>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-300 text-sm">
                            {branch.deliveryRadius || "5km radius"}
                          </span>
                          <span className="text-orange-400 font-medium">
                            ₦{((branch.deliveryFee || 150000) / 100).toFixed(2)}{" "}
                            delivery
                          </span>
                        </div>
                      </div>

                      {/* {branch.specialOffers &&
                        branch.specialOffers.length > 0 && (
                          <div className="bg-orange-600/10 border border-orange-600/30 rounded-lg p-3">
                            <h4 className="text-orange-400 font-semibold text-sm mb-1">
                              Current Offer
                            </h4>
                            <p className="text-gray-300 text-sm">
                              {branch.specialOffers[0].description}
                            </p>
                          </div>
                        )} */}

                      <div className="space-y-2">
                        <h4 className="text-white font-medium text-sm">
                          Recent Reviews
                        </h4>
                        <div className="flex items-center gap-2">
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className="h-4 w-4 text-yellow-400 fill-current"
                              />
                            ))}
                          </div>
                          <span className="text-white text-sm">4.9/5</span>
                          <span className="text-gray-400 text-sm">
                            ({branch.testimonials?.length || 1} reviews)
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-3 pt-4 border-t border-gray-700">
                      <Button
                        asChild
                        className="flex-1 bg-orange-600 hover:bg-orange-700 text-white rounded-xl"
                      >
                        <Link href={`/branches/${branch.slug}`}>
                          View Branch Page
                        </Link>
                      </Button>

                      <WhatsAppButton
                        branch={branch}
                        message={`Hello ${branch.name}! I'd like to place an order. Can you send me your menu?`}
                      />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          <div className="text-center mt-16 space-y-6">
            <h2 className="text-2xl font-bold text-white">
              Can&apos;t find your area?
            </h2>
            <p className="text-gray-400 max-w-md mx-auto">
              We&apos;re expanding! Contact us to request delivery to your
              location or to learn about upcoming branches.
            </p>
            <WhatsAppButton
              phoneNumber="+2348012345678"
              message="Hello! I'd like to know if you deliver to my area or if there are plans for a new branch near me."
              buttonText="Contact Us About Coverage"
              size="lg"
              variant="outline"
              className="bg-transparent border-gray-600 hover:bg-gray-700/50 text-gray-100 px-8 rounded-xl"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default BranchesPage;
