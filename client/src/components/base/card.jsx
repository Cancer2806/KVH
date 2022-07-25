// base component to display cards

export default function Card(props) {

  return (
    <div className="flex justify-center">
      <div className="rounded-lg shadow-lg bg-white max-w-sm">
        <div>
          <img className="rounded-t-lg" src={`${process.env.PUBLIC_URL}${props.img}`} alt="Not viewable" />
        </div>
        <div className="p-6">
          <h3 className="text-gray-900 text-xl font-medium mb-2">{props.number}:  {props.title}</h3>
          <h5 className="text-gray-700 text-base mb-4">Rooms: {props.rooms}. Max Pax: {props.max}</h5>
          <p className="text-gray-700 text-base mb-4">{props.text}</p>
          <button type="button" className=" inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">Book Now</button>
        </div>
      </div>
    </div>
  )
}