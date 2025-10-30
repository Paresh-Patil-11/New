import { useState } from 'react'
import { Heart, Brain, Bone, Baby, Stethoscope, AlertCircle, ArrowRight, Phone, Clock, Award, Users } from 'lucide-react'

const Services = () => {
  const [selectedService, setSelectedService] = useState(null)

  const services = [
    {
      id: 1,
      title: 'Cardiology',
      description: 'Comprehensive heart care with advanced diagnostic and treatment options.',
      icon: Heart,
      color: '#006D77',
      bgColor: '#EDF6F9',
      features: [
        'Electrocardiogram (ECG)',
        'Echocardiography',
        'Cardiac Catheterization',
        'Heart Surgery',
        'Preventive Cardiology'
      ],
      specialists: '12 Cardiologists',
      availability: '24/7 Emergency Care'
    },
    {
      id: 2,
      title: 'Neurology',
      description: 'Expert diagnosis and treatment of brain, spinal cord, and nervous system disorders.',
      icon: Brain,
      color: '#006D77',
      bgColor: '#EDF6F9',
      features: [
        'Brain MRI & CT Scans',
        'EEG Testing',
        'Stroke Treatment',
        'Epilepsy Management',
        'Movement Disorders'
      ],
      specialists: '8 Neurologists',
      availability: 'Mon-Sat, 8AM-8PM'
    },
    {
      id: 3,
      title: 'Orthopedics',
      description: 'Specialized care for bones, joints, ligaments, and musculoskeletal conditions.',
      icon: Bone,
      color: '#006D77',
      bgColor: '#EDF6F9',
      features: [
        'Joint Replacement',
        'Sports Medicine',
        'Spine Surgery',
        'Fracture Care',
        'Physical Therapy'
      ],
      specialists: '10 Orthopedic Surgeons',
      availability: 'Mon-Sat, 9AM-6PM'
    },
    {
      id: 4,
      title: 'Pediatrics',
      description: 'Gentle and comprehensive healthcare services for infants, children, and adolescents.',
      icon: Baby,
      color: '#006D77',
      bgColor: '#EDF6F9',
      features: [
        'Well-Child Visits',
        'Vaccinations',
        'Growth Monitoring',
        'Behavioral Health',
        'Acute Illness Care'
      ],
      specialists: '15 Pediatricians',
      availability: 'Mon-Sun, 8AM-8PM'
    },
    {
      id: 5,
      title: 'Primary Care',
      description: 'Your first point of contact for routine check-ups, preventive care, and general health.',
      icon: Stethoscope,
      color: '#006D77',
      bgColor: '#EDF6F9',
      features: [
        'Annual Physicals',
        'Chronic Disease Management',
        'Health Screenings',
        'Immunizations',
        'Minor Procedures'
      ],
      specialists: '20 Primary Care Physicians',
      availability: 'Mon-Fri, 7AM-7PM'
    },
    {
      id: 6,
      title: 'Emergency Care',
      description: '24/7 emergency medical services with rapid response and expert care.',
      icon: AlertCircle,
      color: '#DC2626',
      bgColor: '#FEE2E2',
      features: [
        'Trauma Care',
        'Critical Care',
        'Urgent Surgery',
        'Ambulance Services',
        'Life Support'
      ],
      specialists: 'Emergency Medicine Team',
      availability: '24/7 Always Available'
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-[#EDF6F9]">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-[#006D77] to-[#83C5BE] text-white py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Our Medical Services
            </h1>
            <p className="text-xl md:text-2xl text-[#EDF6F9] mb-8">
              Comprehensive healthcare solutions delivered by expert professionals with state-of-the-art technology
            </p>
            <div className="flex flex-wrap justify-center gap-8 mt-12">
              <div className="flex items-center gap-3">
                <Award className="h-8 w-8" />
                <div className="text-left">
                  <p className="text-2xl font-bold">50+</p>
                  <p className="text-sm text-[#EDF6F9]">Specialties</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Users className="h-8 w-8" />
                <div className="text-left">
                  <p className="text-2xl font-bold">200+</p>
                  <p className="text-sm text-[#EDF6F9]">Doctors</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Clock className="h-8 w-8" />
                <div className="text-left">
                  <p className="text-2xl font-bold">24/7</p>
                  <p className="text-sm text-[#EDF6F9]">Emergency</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Services Grid */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => {
            const Icon = service.icon
            return (
              <div
                key={service.id}
                className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group cursor-pointer transform hover:-translate-y-2"
                onClick={() => setSelectedService(service)}
              >
                {/* Card Header */}
                <div
                  className="p-6 text-center"
                  style={{ backgroundColor: service.bgColor }}
                >
                  <div
                    className="w-20 h-20 mx-auto rounded-full flex items-center justify-center mb-4 transform group-hover:scale-110 transition-transform duration-300"
                    style={{ backgroundColor: service.color }}
                  >
                    <Icon className="h-10 w-10 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-[#006D77] mb-2">
                    {service.title}
                  </h3>
                </div>

                {/* Card Body */}
                <div className="p-6">
                  <p className="text-gray-600 mb-6 text-center line-clamp-2">
                    {service.description}
                  </p>

                  {/* Quick Info */}
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center text-sm text-gray-600">
                      <Users className="h-4 w-4 mr-2 text-[#83C5BE]" />
                      <span>{service.specialists}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Clock className="h-4 w-4 mr-2 text-[#83C5BE]" />
                      <span>{service.availability}</span>
                    </div>
                  </div>

                  {/* Learn More Button */}
                  <button
                    className="w-full bg-[#006D77] text-white py-3 px-4 rounded-xl font-semibold hover:bg-[#005662] transition-all duration-200 flex items-center justify-center group-hover:shadow-lg"
                  >
                    Learn More
                    <ArrowRight className="ml-2 h-5 w-5 transform group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-[#006D77] text-white py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Need Immediate Medical Attention?
            </h2>
            <p className="text-xl text-[#EDF6F9] mb-8">
              Our emergency department is open 24/7 with expert staff ready to help
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="tel:911"
                className="bg-red-600 hover:bg-red-700 text-white font-bold py-4 px-8 rounded-xl text-lg transition-all duration-200 flex items-center justify-center shadow-lg hover:shadow-xl"
              >
                <Phone className="mr-2 h-6 w-6" />
                Emergency: 108 
              </a>
              <a
                href="tel:+15551234567"
                className="bg-white text-[#006D77] hover:bg-[#EDF6F9] font-bold py-4 px-8 rounded-xl text-lg transition-all duration-200 flex items-center justify-center shadow-lg hover:shadow-xl"
              >
                <Phone className="mr-2 h-6 w-6" />
                Appointments: (555) 123-4567
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Service Modal */}
      {selectedService && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedService(null)}
        >
          <div
            className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div
              className="p-8 text-center"
              style={{ backgroundColor: selectedService.bgColor }}
            >
              <div
                className="w-24 h-24 mx-auto rounded-full flex items-center justify-center mb-4"
                style={{ backgroundColor: selectedService.color }}
              >
                <selectedService.icon className="h-12 w-12 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-[#006D77] mb-2">
                {selectedService.title}
              </h2>
              <p className="text-gray-600 text-lg">
                {selectedService.description}
              </p>
            </div>

            {/* Modal Body */}
            <div className="p-8">
              <h3 className="text-xl font-bold text-[#006D77] mb-4">
                Our Services Include:
              </h3>
              <ul className="space-y-3 mb-6">
                {selectedService.features.map((feature, index) => (
                  <li key={index} className="flex items-center text-gray-700">
                    <div className="w-2 h-2 bg-[#83C5BE] rounded-full mr-3"></div>
                    {feature}
                  </li>
                ))}
              </ul>

              <div className="bg-[#EDF6F9] rounded-xl p-6 mb-6">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center text-gray-700">
                    <Users className="h-5 w-5 mr-2 text-[#006D77]" />
                    <span className="font-semibold">{selectedService.specialists}</span>
                  </div>
                  <div className="flex items-center text-gray-700">
                    <Clock className="h-5 w-5 mr-2 text-[#006D77]" />
                    <span className="font-semibold">{selectedService.availability}</span>
                  </div>
                </div>
              </div>

              <div className="flex gap-4">
                <button
                  className="flex-1 bg-[#006D77] text-white py-3 px-6 rounded-xl font-semibold hover:bg-[#005662] transition-all duration-200"
                  onClick={() => {
                    setSelectedService(null)
                    // Navigate to booking page
                  }}
                >
                  Book Appointment
                </button>
                <button
                  className="flex-1 bg-gray-200 text-gray-700 py-3 px-6 rounded-xl font-semibold hover:bg-gray-300 transition-all duration-200"
                  onClick={() => setSelectedService(null)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Services