import { createContext, useContext } from "react"

const NameContext = createContext();

function Name({name,divisi,children}) {
  return (
    <NameContext.Provider value={{ name: name, divisi:divisi }}>
      {children}
    </NameContext.Provider>
  )
}

function BackgroundCard() {
  const {name,divisi} = useContext(NameContext);
  return (
    <>
      <div className="bg-blue-400 rounded-lg">
        <button>{name} - {divisi}</button>
      </div>
    </>
  )
}

function Context2() {
  return (
    <Name name={"Nur Arifin"} divisi={"backend engineer"}>
      <>
        <h1>Arifin</h1>
        <BackgroundCard/>
      </>
    </Name>
  )
};

export default Context2