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
  Clock
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
    const cls = 'w-6 h-6 text-sky-300';
    switch (iconName) {
      case 'Ambulance': return <Ambulance className={cls} />;
      case 'CalendarCheck': return <CalendarCheck className={cls} />;
      case 'Pill': return <Pill className={cls} />;
      case 'Building2': return <Building2 className={cls} />;
      case 'HeartPulse': return <HeartPulse className={cls} />;
      case 'Microscope': return <Microscope className={cls} />;
      case 'Home': return <Home className={cls} />;
      case 'Activity': return <Activity className={cls} />;
      case 'UserCheck': return <UserCheck className={cls} />;
      case 'Stethoscope': return <Stethoscope className={cls} />;
      case 'ShieldCheck': return <ShieldCheck className={cls} />;
      case 'Video': return <Video className={cls} />;
      default: return <Activity className={cls} />;
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

  const categories = [
    { id: 'all', label: 'All 12 Services' },
    { id: 'emergency', label: 'Emergency & Inpatient' },
    { id: 'homecare', label: 'Home Care & Rehab' },
    { id: 'diagnostic', label: 'Diagnostic & Wellness' },
    { id: 'consultation', label: 'Doctor & Telemed' },
  ];

  return (
    <section
      id="services"
      className="py-20 bg-gradient-to-b from-[#040912] via-[#07182e] to-[#040811] text-white relative border-b border-sky-400/20"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <p className="text-xs sm:text-sm font-semibold text-sky-400 tracking-wide mb-2">
            Comprehensive Healthcare Support Ecosystem
          </p>

          <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-extrabold text-white tracking-tight font-display">
            12 Core Healthcare Facilitation Services
          </h2>

          <p className="mt-2.5 text-xs sm:text-sm font-semibold text-sky-300">
            All services are facilitation via verified MOU partners only
          </p>

          <p className="mt-4 text-slate-300 text-sm sm:text-base leading-relaxed">
            As an enrolled cardholder, you receive priority desk coordination, negotiated partner tariffs, and 24x7 liaison across independent licensed providers in Delhi NCR.
          </p>
        </div>

        {/* Filter and Search Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-10 pb-5 border-b border-sky-400/15">

          {/* Functional Category Filters */}
          <div className="flex items-center flex-wrap gap-1.5 p-1.5 bg-black/60 border border-sky-400/20 rounded-xl">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-colors cursor-pointer whitespace-nowrap ${
                  activeCategory === cat.id
                    ? 'bg-sky-400 text-[#030914] font-bold shadow-sm'
                    : 'text-slate-300 hover:text-white hover:bg-sky-500/10'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Quick Search Input */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-sky-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search facilitation service..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-black/70 border border-sky-400/25 focus:border-sky-400 rounded-xl text-xs sm:text-sm text-white placeholder-slate-400 focus:outline-none"
            />
          </div>
        </div>

        {/* 12 Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredServices.map((service) => (
            <div
              key={service.id}
              className="group sky-black-card rounded-2xl hover:border-sky-400/60 p-6 transition-all duration-200 hover:-translate-y-0.5 flex flex-col justify-between shadow-lg shadow-black/30"
            >
              <div>
                {/* Card Top: Icon & Clean Metadata */}
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-sky-500/15 border border-sky-400/30 flex items-center justify-center group-hover:bg-sky-400/25 transition-colors">
                    {getServiceIcon(service.icon)}
                  </div>
                  <div className="text-right text-xs text-slate-400">
                    <span className="font-mono font-bold text-sky-300 tabular-nums">
                      {service.number}
                    </span>
                    <span className="mx-1.5 text-sky-500/50">·</span>
                    <span className="capitalize text-slate-300">
                      {service.category}
                    </span>
                  </div>
                </div>

                {/* Service Title */}
                <h3 className="text-lg font-bold text-white group-hover:text-sky-200 transition-colors mb-1.5 font-display">
                  {service.title}
                </h3>

                {/* Tagline */}
                <p className="text-xs font-semibold text-sky-300 mb-3">
                  {service.tagline}
                </p>

                {/* Description */}
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4">
                  {service.description}
                </p>

                {/* Scope Points */}
                <ul className="space-y-1.5 mb-5 pt-3 border-t border-sky-400/15">
                  {service.facilitationScope.slice(0, 2).map((item, idx) => (
                    <li key={idx} className="text-xs text-slate-300 flex items-start gap-2">
                      <span className="text-sky-400 font-bold">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Card Footer */}
              <div className="pt-4 border-t border-sky-400/15 space-y-3">
                <div className="flex items-center justify-between text-[11px] text-slate-400">
                  <span className="flex items-center gap-1.5 font-medium text-slate-300">
                    <Clock className="w-3.5 h-3.5 text-sky-400" />
                    <span>{service.partnerSLA}</span>
                  </span>
                  <span className="text-sky-300/90 font-medium">
                    MOU Partner Only
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2.5">
                  <button
                    onClick={() => setSelectedServiceDetail(service)}
                    className="w-full py-2 px-3 text-xs font-semibold text-sky-100 bg-black/60 hover:bg-sky-950/80 border border-sky-400/25 rounded-lg transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <Info className="w-3.5 h-3.5 text-sky-400" />
                    <span>View Scope</span>
                  </button>

                  <button
                    onClick={() => onSelectServiceForBooking(service)}
                    className="w-full py-2 px-3 text-xs font-extrabold text-[#030914] bg-sky-400 hover:bg-sky-300 rounded-lg transition-colors flex items-center justify-center gap-1 cursor-pointer"
                  >
                    <span>Book Now</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredServices.length === 0 && (
          <div className="text-center py-16 sky-black-card rounded-2xl">
            <p className="text-slate-300 font-medium">
              No facilitation services matched &ldquo;{searchQuery}&rdquo;
            </p>
            <button
              onClick={() => { setSearchQuery(''); setActiveCategory('all'); }}
              className="mt-4 px-5 py-2.5 bg-sky-400 hover:bg-sky-300 text-[#030914] font-bold text-xs rounded-xl cursor-pointer"
            >
              Reset Search &amp; Filters
            </button>
          </div>
        )}

      </div>

      {/* Service Detail Modal */}
      {selectedServiceDetail && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-gradient-to-b from-[#081a30] to-[#040912] rounded-2xl max-w-lg w-full p-6 sm:p-7 shadow-2xl relative border border-sky-400/35 text-white">
            <button
              onClick={() => setSelectedServiceDetail(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white p-1.5 rounded-lg hover:bg-sky-500/15 transition-colors cursor-pointer"
              aria-label="Close"
            >
              ✕
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-sky-500/15 border border-sky-400/35 flex items-center justify-center">
                {getServiceIcon(selectedServiceDetail.icon)}
              </div>
              <div>
                <span className="text-xs font-mono font-bold text-sky-400">
                  Service {selectedServiceDetail.number}
                </span>
                <h3 className="text-xl font-bold text-white font-display">
                  {selectedServiceDetail.title}
                </h3>
              </div>
            </div>

            <p className="text-xs font-semibold text-sky-200 bg-sky-500/10 p-3 rounded-xl border border-sky-400/25 mb-4">
              {selectedServiceDetail.mouNotice}
            </p>

            <p className="text-sm text-slate-300 mb-4 leading-relaxed">
              {selectedServiceDetail.description}
            </p>

            <div className="space-y-2 mb-6">
              <h4 className="text-xs font-bold text-sky-300 tracking-wide">
                Full Facilitation Scope
              </h4>
              <ul className="space-y-2 bg-black/50 p-4 rounded-xl border border-sky-400/15">
                {selectedServiceDetail.facilitationScope.map((scope, idx) => (
                  <li key={idx} className="text-xs text-slate-200 flex items-start gap-2">
                    <span className="text-sky-400 font-bold shrink-0">✓</span>
                    <span>{scope}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex items-center justify-between text-xs text-slate-400 pb-5 border-b border-sky-400/15">
              <span>Coordination SLA</span>
              <span className="font-bold text-sky-200">{selectedServiceDetail.partnerSLA}</span>
            </div>

            <div className="mt-5 flex gap-3">
              <button
                onClick={() => {
                  const s = selectedServiceDetail;
                  setSelectedServiceDetail(null);
                  onSelectServiceForBooking(s);
                }}
                className="flex-1 py-3 bg-sky-400 hover:bg-sky-300 text-[#030914] font-extrabold text-sm rounded-xl transition-colors text-center cursor-pointer"
              >
                Book This Facilitation Now
              </button>
              <button
                onClick={() => setSelectedServiceDetail(null)}
                className="px-5 py-3 bg-black/60 hover:bg-slate-900 border border-sky-400/25 text-slate-200 font-semibold text-sm rounded-xl transition-colors cursor-pointer"
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
