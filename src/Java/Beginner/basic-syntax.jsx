"use client"

import React from "react";
import { Button } from "../../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";

const JavaSyntaxGame = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-purple-900 to-violet-950 text-white overflow-hidden relative">
      <div className="mx-auto p-4 pt-24 text-black text-white">
        <Card className="border-4 border-primary shadow-lg bg-gray-200 text-black w-full max-w-4xl mx-auto">
          <CardHeader className="bg-primary/10">
            <CardTitle className="text-xl">Java Syntax Game</CardTitle>
          </CardHeader>
          <CardContent className="p-6 space-y-6">
            <div className="bg-black text-green-400 p-4 rounded-md font-mono text-sm overflow-x-auto">
              <div className="relative">
                <div>public class Main {"{"}</div>
                <div className="ml-4">public static void main(String[] args) {"{"}</div>
                <div className="ml-8 flex items-center gap-2">
                  <span>System.out.println("Hello </span>
                  <input
                    className="w-32 h-6 px-1 py-0 bg-black border-green-400 text-green-400 inline-block"
                    placeholder="your name"
                  />
                  <span>");</span>
                </div>
                <div className="ml-4">{"}"}</div>
                <div>{"}"}</div>
                {/* Arrows and explanations */}
                <div className="absolute left-0 top-0 mt-1 ml-2">
                  <span className="text-white">↑</span>
                  <div className="bg-gray-800 text-white p-1 rounded-md">Class Declaration</div>
                </div>
                <div className="absolute left-0 top-10 mt-1 ml-2">
                  <span className="text-white">↑</span>
                  <div className="bg-gray-800 text-white p-1 rounded-md">Main Method</div>
                </div>
                <div className="absolute left-0 top-20 mt-1 ml-2">
                  <span className="text-white">↑</span>
                  <div className="bg-gray-800 text-white p-1 rounded-md">Print Statement</div>
                </div>
              </div>
            </div>
            <Button className="bg-black text-white" onClick={() => alert("Game Started!")}>
              Start Game
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default JavaSyntaxGame;
