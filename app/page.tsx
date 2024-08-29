'use client'
import React from 'react';
import Link from "next/link";
import { Button } from '@/components/ui/button';

export default function Home() {

  return (
          <div className="flex items-center justify-center mt-4">
              <div className="text-center">
                  <h2 className="text-4xl mb-2">Budget Tracker</h2>
                  <div className="text-center">
                      <h2 className="text-white text-1xl font-semibold mb-6">Personal budgeting made easy</h2>
                      <Button asChild>
                        <Link href={"/login"}>Create an account or login</Link>
                      </Button>
                  </div>
              </div>
          </div>
  );
}
