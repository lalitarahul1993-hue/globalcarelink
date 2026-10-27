import React, { useState } from 'react';
import { 
  Ambulance, 
  CalendarCheck, 
  Pill, 
  Building2, 
  HeartPulse, 
  Microscope, 
  Home, 
  Activity, 
  UserCheck, 
  Stethoscope, 
  ShieldCheck, 
  Video,
  Search,
  ArrowUpRight,
  Info,
  Clock,
  Sparkles
} from 'lucide-react';
import { FACILITATION_SERVICES } from '../data/servicesData';
import { FacilitationService } from '../types';

interface ServicesGridProps {
  onSelectServiceForBooking: (service: FacilitationService) => void;
}

export const ServicesGrid: React.FC<ServicesGridProps> = ({ onSelectServiceForBooking }) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedServiceDetail, setSelectedServiceDetail] = useState<FacilitationService | null>(null);

  const getServiceIcon = (iconName: string) => {
    switch (iconName) {
      case 'Ambulance':
        return <Ambulance className="w-6 h-6 text-amber-500" />;
      case 'CalendarCheck':
        return <CalendarCheck className="w-6 h-6 text-amber-500" />;
      case 'Pill':
        return <Pill className="w-6 h-6 text-amber-500" />;
      case 'Building2':
        return <Building2 className="w-6 h-6 text-amber-500" />;
      case 'HeartPulse':
        return <HeartPulse className="w-6 h-6 text-amber-500" />;
      case 'Microscope':
        return <Microscope className="w-6 h-6 text-amber-500" />;
      case 'Home':
        return <Home className="w-6 h-6 text-amber-500" />;
      case 'Activity':
        return <Activity className="w-6 h-6 text-amber-500" />;
      case 'UserCheck':
        return <UserCheck className="w-6 h-6 text-amber-500" />;
      case 'Stethoscope':
        return <Stethoscope className="w-6 h-6 text-amber-500" />;
      case 'ShieldCheck':
        return <ShieldCheck className="w-6 h-6 text-amber-500" />;
      case 'Video':
        return <Video className="w-6 h-6 text-amber-500" />;
      default:
        return <Activity className="w-6 h-6 text-amber-500" />;
    }
  };

  const filteredServices = FACILITATION_SERVICES.filter(service => {
    const matchesCategory = activeCategory === 'all' || service.category === activeCategory;
    const matchesSearch = 
      service.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.tagline.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <section id="services" className="py-20 bg-slate-50 relative border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-amber-700 bg-amber-100/70 px-3 py-1 rounded-md mb-3 border border-amber-200">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            <span>Comprehensive Healthcare Support Ecosystem</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-display">
            12 Core Healthcare Facilitation Services
          </h2>

          {/* Mandatory Explicit Disclaimer Subheading */}
          <div className="mt-3 inline-block bg-amber-50 border border-amber-300/80 px-4 py-1.5 rounded-lg">
            <p className="text-xs sm:text-sm font-semibold text-amber-900">
              (All services are facilitation via MOU Partner Only)
            </p>
          </div>

          <p className="mt-4 text-slate-600 text-sm sm:text-base leading-relaxed">
            As an enrolled cardholder, you receive priority desk coordination, negotiated partner tariffs, and 24x7 liaison across independent licensed providers in Delhi NCR.
          </p>
        </div>

        {/* Filter and Search Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-10 pb-4 border-b border-slate-200">
          
          {/* Functional Category Filters */}
          <div className="flex items-center flex-wrap gap-1 p-1 bg-slate-200/70 rounded-xl">
            <button
              onClick={() => setActiveCategory('all')}
              className={`px-4 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-all cursor-pointer whitespace-nowrap ${
                activeCategory === 'all'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              All 12 Services
            </button>
            <button
              onClick={() => setActiveCategory('emergency')}
              className={`px-4 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-all cursor-pointer whitespace-nowrap ${
                activeCategory === 'emergency'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Emergency & Inpatient
            </button>
            <button
              onClick={() => setActiveCategory('homecare')}
              className={`px-4 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-all cursor-pointer whitespace-nowrap ${
                activeCategory === 'homecare'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Home Care & Rehab
            </button>
            <button
              onClick={() => setActiveCategory('diagnostic')}
              className={`px-4 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-all cursor-pointer whitespace-nowrap ${
                activeCategory === 'diagnostic'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Diagnostic & Wellness
            </button>
            <button
              onClick={() => setActiveCategory('consultation')}
              className={`px-4 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-all cursor-pointer whitespace-nowrap ${
                activeCategory === 'consultation'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Doctor & Telemed
            </button>
          </div>

          {/* Quick Search Input */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search facilitation service..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-white border border-slate-300 focus:border-amber-500 rounded-xl text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-none shadow-xs"
            />
          </div>
        </div>

        {/* 12 Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredServices.map((service) => (
            <div
              key={service.id}
              className="group bg-white rounded-2xl border border-slate-200/90 hover:border-amber-400/80 p-6 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 flex flex-col justify-between"
            >
              <div>
                {/* Card Top: Number & Category */}
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-amber-50 border border-amber-200/70 flex items-center justify-center group-hover:bg-amber-100/70 transition-colors">
                    {getServiceIcon(service.icon)}
                  </div>
                  <div className="text-right">
                    <span className="font-mono text-xs font-bold text-slate-400 tracking-wider">
                      {service.number}
                    </span>
                    <span className="block text-[11px] font-medium text-amber-700 capitalize">
                      {service.category}
                    </span>
                  </div>
                </div>

                {/* Service Title */}
                <h3 className="text-lg font-bold text-slate-900 group-hover:text-[#0a192f] transition-colors mb-2 font-display">
                  {service.title}
                </h3>

                {/* Tagline */}
                <p className="text-xs font-semibold text-amber-800 mb-3">
                  {service.tagline}
                </p>

                {/* Description */}
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
                  {service.description}
                </p>

                {/* Scope Points */}
                <ul className="space-y-1.5 mb-5 pt-3 border-t border-slate-100">
                  {service.facilitationScope.slice(0, 2).map((item, idx) => (
                    <li key={idx} className="text-xs text-slate-600 flex items-start gap-1.5">
                      <span className="text-amber-500 font-bold">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Card Footer: SLA & Book Action */}
              <div className="pt-4 border-t border-slate-100 space-y-3">
                <div className="flex items-center justify-between text-[11px] text-slate-500">
                  <span className="flex items-center gap-1 font-medium">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    <span>{service.partnerSLA}</span>
                  </span>
                  <span className="text-amber-800 font-semibold italic text-[10px]">
                    MOU Partner Only
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => setSelectedServiceDetail(service)}
                    className="w-full py-2 px-3 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors flex items-center justify-center gap-1 cursor-pointer"
                  >
                    <Info className="w-3.5 h-3.5" />
                    <span>View Scope</span>
                  </button>

                  <button
                    onClick={() => onSelectServiceForBooking(service)}
                    className="w-full py-2 px-3 text-xs font-bold text-[#0a192f] bg-amber-400 hover:bg-amber-300 rounded-lg transition-colors flex items-center justify-center gap-1 cursor-pointer shadow-xs"
                  >
                    <span>Request Booking</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredServices.length === 0 && (
          <div className="text-center py-16 bg-white rounded-2xl border border-slate-200">
            <p className="text-slate-500 font-medium">No facilitation services matched your query &ldquo;{searchQuery}&rdquo;</p>
            <button
              onClick={() => { setSearchQuery(''); setActiveCategory('all'); }}
              className="mt-3 px-4 py-2 bg-amber-400 text-[#0a192f] font-semibold text-xs rounded-lg cursor-pointer"
            >
              Reset Search & Filters
            </button>
          </div>
        )}

      </div>

      {/* Service Detail Modal Popup */}
      {selectedServiceDetail && (
        <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 sm:p-7 shadow-2xl relative border border-slate-200">
            <button
              onClick={() => setSelectedServiceDetail(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 p-1.5 rounded-lg hover:bg-slate-100 transition-colors"
            >
              ✕
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center">
                {getServiceIcon(selectedServiceDetail.icon)}
              </div>
              <div>
                <span className="text-xs font-mono font-bold text-slate-400">
                  SERVICE #{selectedServiceDetail.number}
                </span>
                <h3 className="text-xl font-bold text-slate-900 font-display">
                  {selectedServiceDetail.title}
                </h3>
              </div>
            </div>

            <p className="text-xs font-semibold text-amber-700 bg-amber-50 p-2.5 rounded-lg border border-amber-200 mb-4">
              {selectedServiceDetail.mouNotice}
            </p>

            <p className="text-sm text-slate-600 mb-4 leading-relaxed">
              {selectedServiceDetail.description}
            </p>

            <div className="space-y-2 mb-6">
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                Full Facilitation Scope:
              </h4>
              <ul className="space-y-2 bg-slate-50 p-3.5 rounded-xl border border-slate-200/80">
                {selectedServiceDetail.facilitationScope.map((scope, idx) => (
                  <li key={idx} className="text-xs text-slate-700 flex items-start gap-2">
                    <span className="text-amber-500 font-bold shrink-0">✓</span>
                    <span>{scope}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex items-center justify-between text-xs text-slate-500 pb-5 border-b border-slate-200">
              <span className="font-medium">Coordination SLA:</span>
              <span className="font-bold text-slate-800">{selectedServiceDetail.partnerSLA}</span>
            </div>

            <div className="mt-5 flex gap-3">
              <button
                onClick={() => {
                  const s = selectedServiceDetail;
                  setSelectedServiceDetail(null);
                  onSelectServiceForBooking(s);
                }}
                className="flex-1 py-3 bg-amber-400 hover:bg-amber-300 text-[#0a192f] font-bold text-sm rounded-xl transition-colors text-center cursor-pointer shadow-xs"
              >
                Book This Facilitation Now
              </button>
              <button
                onClick={() => setSelectedServiceDetail(null)}
                className="px-5 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-sm rounded-xl transition-colors cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
