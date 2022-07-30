// base component to display cards

export default function Card(props) {

  // TODO View Details button should open a modal window showing more information about the cottage

  return (

      <div className="rounded overflow-hidden shadow-lg">
        <div>
          <img className="w-full h-auto rounded-t-lg" src={`${process.env.PUBLIC_URL}${props.img}`} alt="Cottage" />
        <div className="px-6 py-4">
          <h3 className="text-gray-900 text-xl font-medium mb-2">{props.number}: &nbsp; {props.title}</h3>
          <h4 className="text-gray-700 text-base mb-4">Rooms: {props.rooms}&nbsp; &nbsp; Max Pax: {props.max}</h4>
          <p className="text-gray-700 text-base mb-4">{props.text}</p>
          
          {/* Button to open modal window with more details on the cottage */}
          {/* <button type="button" className=" inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">View Details</button> */}
        </div>
      </div>
    </div>
  )
}