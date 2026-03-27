/**
 * Loading/Spinner Component
 * Displays a loading animation
 */

export function Loader() {
  return (
    <div className="flex fle justifyContent-center alignItems-center py-8">
      <div className="relative w-12 h-12">
        {/* Outer ring */}
        <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-purple-500 animate-spin"></div>
        
        {/* Inner ring */}
        <div className="absolute inset-2 rounded-full border-4 border-transparent border-r-blue-500 animate-spin" style={{ animationDirection: 'reverse' }}></div>
        
        {/* Center dot */}
        <div className="absolute inset-4 rounded-full bg-gradient-to-br from-purple-500 to-blue-500"></div>
      </div>
    </div>
  );
}
