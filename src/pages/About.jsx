import React from 'react'

function About() {
  return (
    <div> {/* About Us Section */}
    <section className="py-12 bg-gray-50">
      <h1 className="text-3xl font-extrabold text-center text-gray-900 mb-8">About Us</h1>
      <div className="container mx-auto flex flex-wrap items-center justify-center gap-6 md:gap-10">
        
        {/* Image 1 */}
        <div className="w-full md:w-[48%] h-96 bg-gray-100">
          <img src='boy.jpg' alt="About Us" className="w-full h-full object-cover rounded-lg shadow-lg" />
        </div>
        
        {/* Text 1 */}
        <div className="w-full md:w-[48%] h-96 bg-gray-100 flex items-center justify-center px-6 text-center rounded-lg shadow-lg">
          <p className="text-lg leading-relaxed">
            Welcome to <span className="font-bold text-blue-600">Jess Master</span>, your premier destination for past 
            exam questions and study resources. Our mission is to provide 
            high-quality educational materials, fostering academic excellence 
            and empowering students to achieve their goals.
          </p>
        </div>

        {/* Text 2 */}
        <div className="w-full md:w-[48%] h-96 bg-gray-100 flex items-center justify-center px-6 text-center rounded-lg shadow-lg">
          <p className="text-lg leading-relaxed">
            Gain access to a vast collection of past exam questions across 
            multiple disciplines. Whether you're preparing for university 
            entrance exams or professional certifications, we've got you covered.
          </p>
        </div>

        {/* Image 2 */}
        <div className="w-full md:w-[48%] h-96 bg-red-100">
          <img src={'boy.jpg'} alt="Exam Preparation" className="w-full h-full object-cover rounded-lg shadow-lg" />
        </div>

      </div>
    </section><br/></div>
  )
}

export default About