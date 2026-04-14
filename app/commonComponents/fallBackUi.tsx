
const FallBackUi =({title,description}:any)=>{
    return (
        <>
          <div className="flex flex-col justify-center items-center h-52 gap-2">
                    <div className="text-5xl">😕</div>
                    <p className="text-gray-600 text-lg font-semibold">
                        
                        {title}
                    </p>
                    <p className="text-sm text-gray-400">
                        
                        {description}
                    </p>
                </div>
        </>
    )
}
export default FallBackUi