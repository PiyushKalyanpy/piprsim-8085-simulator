"use client";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Home() {
  const [codeText, setCodeText] = useState("");
  const [registers, setRegisters]: any = useState({});
  const [memory, setMemory]: any = useState({});
  const [flags, setFlags]: any = useState({});
  const [statusCode, setStatusCode]: any = useState(0);
  const [address, setAddress]: any = useState(0);
  const [valueAtAddress, setValueAtAddress]: any = useState(0);
  const colorClasses = [
    "bg-red-300/20 shadow-2xl shadow-red-300/30",
    "bg-lime-300/20 shadow-2xl shadow-lime-300/30",
    "bg-pink-300/20 shadow-2xl shadow-pink-300/30",
    "bg-yellow-300/20 shadow-2xl shadow-yellow-300/30",
    "bg-green-300/20 shadow-2xl shadow-green-300/30",
    "bg-blue-300/20 shadow-2xl shadow-blue-300/30",
    "bg-indigo-300/20 shadow-2xl shadow-indigo-300/30",
    "bg-purple-300/20 shadow-2xl shadow-purple-300/30",
    "bg-pink-300/20 shadow-2xl shadow-pink-300/30",
    "bg-teal-300/20 shadow-2xl shadow-teal-300/30",
    "bg-gray-300/20 shadow-2xl shadow-gray-300/30",
  ];
  function getRandomColorClass() {
    const randomIndex = Math.floor(Math.random() * colorClasses.length);
    return colorClasses[randomIndex];
  }

  const clearAll = () => {
    setRegisters({});
    setMemory({});
    setFlags({});
    setStatusCode(0);
  };

  const executeCode = async () => {
    // clear all data
    clearAll();
    setStatusCode(0);
    // content type is body
    const response = await fetch("https://microprocessor-sim.vercel.app/read_code", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ code: codeText }),
    })
      .then((res) => res.json())
      .then((data) => {
        data = data;
        console.log(data);
        setRegisters(data.registers);
        setMemory(data.memory);
        setFlags(data.flags);
        setStatusCode(200);
      })
      .catch((err) => {
        console.log(err);
        setStatusCode(500);
      });
  };

  const moveAddress = async (direction: any) => {
    console.log("move address");
    setAddress(Number(address) + direction);
    
  };

  useEffect(() => {
    if (address) {
      setValueAtAddress(memory[address] ? parseInt(memory[address], 16) : 0);
    }
  }, [address, memory]);

  return (
    <main className="h-screen ">
      {/* fixed div for background image  */}
      
      {/* code and response data */}
      <div className="flex flex-row w-full p-8 h-full ">
        {/* code editor  */}
        <div className="border-1 m-2 w-full h-full bg-gray-100 dark:bg-zinc-800/30 rounded-2xl overflow-hidden">
          {/* display heading for code  */}
          <div className=" flex flex-row justify-between w-full h-fit border-b-2 border-gray-200  px-6 py-4">
            <p className="font ">Code</p>
            <div className="flex flex-row items-center space-x-4">
              <div>
                {/* if status code is 200 show green circle */}
                {statusCode == 200 ? (
                  <div className="w-3 h-3 bg-lime-500 rounded-full shadow-2xl shadow-white "></div>
                ) : null}
                {/* if status code is 500 show red circle */}
                {statusCode == 500 ? (
                  <div className="w-3 h-3 bg-red-500 rounded-full drop-shadow-2xl "></div>
                ) : null}
                {/* if status code is 0 */}
                {statusCode == 0 ? (
                  <div className="w-3 h-3 bg-gray-500 rounded-full shadow-xl shadow-gray-500/40"></div>
                ) : null}
              </div>

              {/* button for execution */}
              <div
                onClick={executeCode}
                className=" active:bg-violet-200/50 cursor-pointer hover:bg-violet-200/70 px-8 py-2 rounded-2xl text-white w-fit bg-violet-200/20  shadow-xl shadow-violet-200/10 "
              >
                Execute{" "}
              </div>
            </div>
          </div>
          <textarea
            className="bg-gray-100 rounded-2xl text-white placeholder:text-zinc-300 dark:bg-zinc-800/30  outline-none p-4 w-full leading-relaxed text-2xl h-full font-spacemono"
            placeholder="Enter your code here "
            rows={10}
            spellCheck={false}
            autoCapitalize="true"
            value={codeText}
            onChange={(e) => {
              setStatusCode(0);
              setCodeText(e.target.value);
            }}
            cols={50}
          />
        </div>

        {/* showing data from response */}
        <div className="border-1 m-2 w-full h-full space-y-8">
          {/* displaying registers values using table */}
          <div className="space-y-8">
            {/* show label for memory */}
            <div className="flex flex-row justify-between w-full h-fit border-b-2 border-gray-200  px-6 py-4">
              <p className="font ">Memory</p>
            </div>

            {/* buttons and values  */}
            <div className="flex flex-row space-x-8">
              {/* left button */}
              <div
                onClick={() => moveAddress(-1)}
                className="cursor-pointer  active:bg-zinc-800/50 hover:bg-zinc-800/70 px-8 py-4 rounded-2xl bg-zinc-800/50"
              >
                Left{" "}
              </div>

              {/* input and display box */}
              <div className=" flex flex-row w-full  rounded-2xl overflow-hidden">
                {/* value input  */}
                <div className="w-1/2 px-8 py-4 bg-zinc-800/40 border-r-1 ">
                  <input
                    name="number"
                    className="bg-transparent outline-none w-full h-full placeholder:text-zinc-200/40 font-mono text-xl"
                    placeholder="Enter address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </div>
                {/* value from memory */}
                <div className=" w-1/2 px-8 py-4 bg-zinc-800/60">
                  <p className="font-mono text-xl">{valueAtAddress}</p>
                </div>
              </div>

              {/* right button */}
              <div
                onClick={() => moveAddress(1)}
                className="cursor-pointer active:bg-zinc-800/50 hover:bg-zinc-800/70 px-8 py-4 rounded-2xl bg-zinc-800/50 "
              >
                Right{" "}
              </div>
            </div>
            {/* registers are - A , B, C, D, E, H, L */}
            {/* show label for register  */}
            <div className="flex flex-row justify-between w-full h-fit border-b-2 border-gray-200  px-6 py-4">
              <p className="font ">Registers</p>
            </div>
            <div className="flex flex-row justify-around  gap-4	 w-full  ">
              {registers &&
                Object.keys(registers).map((key) => (
                  <div
                    key={key}
                    className={`flex flex-col justify-around w-full items-center px-4 py-2 rounded-2xl ${getRandomColorClass()}`}
                  >
                    <p className="font-mono text-xl">{key}</p>
                    <p className="font-mono text-xl">{registers[key]}</p>
                  </div>
                ))}
            </div>

            {/* displaying flags */}
            <div className="flex flex-row justify-between w-full h-fit border-b-2 border-gray-200  px-6 py-4">
              <p className="font ">Flags</p>
            </div>
            <div className="flex flex-row justify-around  gap-4	 w-full  ">
              {flags &&
                Object.keys(flags).map((key) => (
                  <div
                    key={key}
                    className={`flex flex-col justify-around w-full items-center px-4 py-2 rounded-2xl ${getRandomColorClass()}`}
                  >
                    <p className="font-mono text-xl">{key}</p>
                    <p className="font-mono text-xl">{flags[key]}</p>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
