export default function Context(params) {
  
  function screenRight() {
    return <h1>Arifin</h1>
  }
  
  return (
    <div className="flex justify-between w-full h-full">
      <h1 className="basis-2/5 border-r-2 border-black text-right">Nur</h1>
      <h1 className="basis-3/5 h-screen">{screenRight}</h1>
    </div>
  )
}