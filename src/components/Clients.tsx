"use client"
import React, { useState } from 'react';
import Image, { StaticImageData } from 'next/image';

// Müşteri logolarınızı buraya içe aktarın
import hooliLogo from '@/../public/images/clients/hooli.svg';
import lyftLogo from '@/../public/images/clients/lyft.svg';
import robinhoodLogo from '@/../public/images/clients/robinhood.svg';
import stripeLogo from '@/../public/images/clients/stripe.svg';
import awsLogo from '@/../public/images/clients/aws.svg';
import redditLogo from '@/../public/images/clients/reddit.svg';

interface Client {
  name: string;
  logo: StaticImageData;
  alt: string;
}

const clients: Client[] = [
  { name: 'Hooli', logo: hooliLogo, alt: 'Hooli Logosu' },
  { name: 'Lyft', logo: lyftLogo, alt: 'Lyft Logosu' },
  { name: 'Robinhood', logo: robinhoodLogo, alt: 'Robinhood Logosu' },
  { name: 'Stripe', logo: stripeLogo, alt: 'Stripe Logosu' },
  { name: 'AWS', logo: awsLogo, alt: 'AWS Logosu' },
  { name: 'Reddit', logo: redditLogo, alt: 'Reddit Logosu' },
];

const Clients: React.FC = () => {
  const [activeClient, setActiveClient] = useState<string | null>(null);

  const handleTouchStart = (clientName: string) => {
    setActiveClient(clientName);
  };

  const handleTouchEnd = () => {
    setActiveClient(null);
  };

  return (
      <div className="container mx-auto text-center">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-8 justify-center items-center">
          {clients.map((client) => (
            <div
              key={client.name}
              className="flex justify-center items-center transition-all duration-200 ease-in-out"
              onTouchStart={() => handleTouchStart(client.name)}
              onTouchEnd={handleTouchEnd}
              onTouchCancel={handleTouchEnd}
            >
              <Image
                src={client.logo}
                alt={client.alt}
                height={40}
                width={100}
                objectFit="contain"
                className={`filter hover:sepia ${activeClient === client.name ? 'opacity-70' : ''}`}
              />
            </div>
          ))}
        </div>
      </div>
  );
};

export default Clients;