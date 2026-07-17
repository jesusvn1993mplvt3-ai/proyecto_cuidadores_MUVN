import React, { useState } from 'react';
import { 
  Heart, 
  Activity, 
  Droplet, 
  CircleDot, 
  Target, 
  ChevronRight, 
  ArrowLeft, 
  FlaskConical, 
  Info, 
  ChevronDown, 
  CheckCircle2,
  MapPin,
  Phone
} from 'lucide-react';

// --- BASE DE DATOS SIMULADA ---
// Extraída de la hoja del Laboratorio Lisier, adaptada para pacientes
const data = {
  corazon: {
    id: 'corazon',
    name: 'Corazón y Sangre',
    icon: Heart,
    description: 'Estudios para evaluar el riesgo cardiovascular y daño al músculo cardíaco.',
    color: 'bg-red-50 text-red-600',
    diseases: [
      {
        id: 'riesgo_cardio',
        name: 'Riesgo Cardiovascular (Colesterol)',
        tests: [
          { 
            name: 'Perfil de Lípidos (Colesterol, Triglicéridos, HDL, LDL)', 
            category: 'Perfiles / Química Clínica',
            desc: 'Mide los niveles de grasas "buenas" y "malas" en la sangre. Ayuda a saber si hay riesgo de que las arterias se tapen, lo que podría causar un infarto.' 
          },
          { 
            name: 'Glucosa', 
            category: 'Química Clínica',
            desc: 'El exceso de azúcar en la sangre daña los vasos sanguíneos con el tiempo, aumentando el riesgo de problemas del corazón.' 
          }
        ]
      },
      {
        id: 'infarto',
        name: 'Sospecha de Infarto o Daño Cardíaco',
        tests: [
          { 
            name: 'Troponina T / Troponina I', 
            category: 'Química Clínica',
            desc: 'Son proteínas que se liberan en la sangre únicamente cuando el músculo del corazón ha sufrido un daño severo, como durante un infarto.' 
          },
          { 
            name: 'CK-MB', 
            category: 'Química Clínica',
            desc: 'Es una enzima específica del corazón que se eleva rápidamente en la sangre poco después de que ocurre un daño cardíaco.' 
          }
        ]
      }
    ]
  },
  higado: {
    id: 'higado',
    name: 'Hígado',
    icon: Activity,
    description: 'Pruebas para detectar inflamación, infecciones hepáticas o problemas de metabolismo.',
    color: 'bg-orange-50 text-orange-600',
    diseases: [
      {
        id: 'hepatitis',
        name: 'Hepatitis o Daño Hepático',
        tests: [
          { 
            name: 'TGO (AST) y TGP (ALT)', 
            category: 'Química Clínica',
            desc: 'Son enzimas que normalmente viven dentro de las células del hígado. Si sus niveles en sangre están altos, indica que el hígado está inflamado o sus células están dañadas.' 
          },
          { 
            name: 'Bilirrubinas (Total, Directa e Indirecta)', 
            category: 'Química Clínica',
            desc: 'Si el hígado no funciona bien, la bilirrubina se acumula en la sangre causando "ictericia" (un color amarillento en la piel y los ojos).' 
          },
          { 
            name: 'Panel Viral (Hepatitis A, B, C)', 
            category: 'Inmunología',
            desc: 'Pruebas específicas de anticuerpos para detectar si una infección por virus es la causa del problema en el hígado.' 
          }
        ]
      }
    ]
  },
  rinon: {
    id: 'rinon',
    name: 'Riñones y Vías Urinarias',
    icon: Droplet,
    description: 'Estudios para evaluar la filtración de toxinas y detectar infecciones.',
    color: 'bg-blue-50 text-blue-600',
    diseases: [
      {
        id: 'insuficiencia',
        name: 'Problemas de Filtración (Insuficiencia Renal)',
        tests: [
          { 
            name: 'Creatinina', 
            category: 'Química Clínica',
            desc: 'Es un desecho del uso de los músculos. Los riñones sanos la filtran fácilmente. Si aparece alta en tus estudios, significa que los riñones no están limpiando la sangre correctamente.' 
          },
          { 
            name: 'Urea / Ácido Úrico', 
            category: 'Química Clínica',
            desc: 'Se producen cuando el cuerpo descompone alimentos. Al igual que la creatinina, si se elevan, es una señal de alerta para la función de tus riñones.' 
          }
        ]
      },
      {
        id: 'infeccion',
        name: 'Infección de Vías Urinarias',
        tests: [
          { 
            name: 'Examen General de Orina (EGO)', 
            category: 'Estudios Varios',
            desc: 'Revisa de forma rápida si hay bacterias, glóbulos blancos (defensas) o sangre en la orina, lo cual indica que hay una infección activa.' 
          },
          { 
            name: 'Urocultivo', 
            category: 'Microbiología',
            desc: 'Si el EGO sale alterado, el urocultivo permite "sembrar" la orina para ver exactamente qué bacteria crece y decirte qué antibiótico la elimina mejor.' 
          }
        ]
      }
    ]
  },
  pancreas: {
    id: 'pancreas',
    name: 'Páncreas',
    icon: CircleDot,
    description: 'Evaluación del control de azúcar y enzimas digestivas.',
    color: 'bg-yellow-50 text-yellow-600',
    diseases: [
      {
        id: 'diabetes',
        name: 'Diabetes Mellitus',
        tests: [
          { 
            name: 'Glucosa', 
            category: 'Química Clínica',
            desc: 'Mide el nivel de azúcar en tu sangre en el momento exacto de la toma de muestra. Ideal para monitoreo diario.' 
          },
          { 
            name: 'Hemoglobina Glucosilada (HbA1c)', 
            category: 'Química Clínica',
            desc: 'Es como una "fotografía" de los últimos 3 meses. Muestra el promedio real de tus niveles de azúcar, lo que ayuda a saber si el tratamiento de la diabetes está funcionando.' 
          }
        ]
      },
      {
        id: 'pancreatitis',
        name: 'Pancreatitis (Inflamación del Páncreas)',
        tests: [
          { 
            name: 'Amilasa y Lipasa', 
            category: 'Química Clínica',
            desc: 'Son enzimas que el páncreas produce para digerir la comida. Si el páncreas se inflama (causando mucho dolor de estómago), estas enzimas se escapan hacia la sangre y sus niveles suben drásticamente.' 
          }
        ]
      }
    ]
  },
  tiroides: {
    id: 'tiroides',
    name: 'Tiroides',
    icon: Target,
    description: 'Hormonas que controlan tu peso, energía y estado de ánimo.',
    color: 'bg-purple-50 text-purple-600',
    diseases: [
      {
        id: 'hipotiroidismo',
        name: 'Hipo/Hipertiroidismo (Problemas de peso, fatiga)',
        tests: [
          { 
            name: 'Perfil Tiroideo (TSH, T3, T4)', 
            category: 'Hormonas / Perfiles',
            desc: 'La TSH es la hormona del cerebro que le da órdenes a la tiroides. Las T3 y T4 son las hormonas que la tiroides produce. Medir las tres juntas le dice al doctor exactamente dónde está la falla.' 
          }
        ]
      }
    ]
  }
};

export default function LisierApp() {
  const [currentView, setCurrentView] = useState('organs'); // 'organs', 'diseases', 'tests'
  const [selectedOrgan, setSelectedOrgan] = useState(null);
  const [selectedDisease, setSelectedDisease] = useState(null);
  const [expandedTest, setExpandedTest] = useState(null);

  const handleOrganClick = (organKey) => {
    setSelectedOrgan(data[organKey]);
    setCurrentView('diseases');
    window.scrollTo(0, 0);
  };

  const handleDiseaseClick = (disease) => {
    setSelectedDisease(disease);
    setCurrentView('tests');
    setExpandedTest(null);
    window.scrollTo(0, 0);
  };

  const handleBack = () => {
    if (currentView === 'tests') {
      setCurrentView('diseases');
      setSelectedDisease(null);
    } else if (currentView === 'diseases') {
      setCurrentView('organs');
      setSelectedOrgan(null);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans flex flex-col">
      {/* HEADER TIPO LISIER */}
      <header className="bg-[#1C3A70] text-white shadow-md sticky top-0 z-10">
        <div className="max-w-md mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-white p-2 rounded-full">
              <FlaskConical className="text-[#1C3A70]" size={24} />
            </div>
            <div>
              <h1 className="font-bold text-xl leading-tight">Laboratorio Lisier</h1>
              <p className="text-xs text-blue-200">Guía interactiva para pacientes</p>
            </div>
          </div>
        </div>
      </header>

      {/* CONTENIDO PRINCIPAL */}
      <main className="flex-grow max-w-md mx-auto w-full p-4 relative pb-20">
        
        {/* VISTA 1: ÓRGANOS */}
        {currentView === 'organs' && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="bg-blue-100 text-blue-900 p-4 rounded-xl mb-6 shadow-sm border border-blue-200">
              <h2 className="font-semibold flex items-center gap-2 mb-1">
                <Info size={18} /> ¿Qué te recomendó tu médico?
              </h2>
              <p className="text-sm">Selecciona el órgano o área del cuerpo para entender los estudios clínicos asociados.</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {Object.keys(data).map((key) => {
                const organ = data[key];
                const Icon = organ.icon;
                return (
                  <button
                    key={key}
                    onClick={() => handleOrganClick(key)}
                    className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center text-center gap-3 hover:shadow-md hover:border-blue-300 transition-all active:scale-95"
                  >
                    <div className={`p-4 rounded-full ${organ.color}`}>
                      <Icon size={32} />
                    </div>
                    <span className="font-medium text-gray-800 text-sm">{organ.name}</span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* VISTA 2: ENFERMEDADES */}
        {currentView === 'diseases' && selectedOrgan && (
          <div className="animate-in slide-in-from-right-8 duration-300">
            <button 
              onClick={handleBack}
              className="flex items-center text-gray-500 mb-4 hover:text-[#1C3A70] transition-colors"
            >
              <ArrowLeft size={18} className="mr-1" /> Volver a órganos
            </button>

            <div className="flex items-center gap-3 mb-6">
              <div className={`p-3 rounded-full ${selectedOrgan.color}`}>
                <selectedOrgan.icon size={28} />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-800">{selectedOrgan.name}</h2>
                <p className="text-sm text-gray-500">{selectedOrgan.description}</p>
              </div>
            </div>

            <h3 className="font-semibold text-gray-700 mb-3 px-1">Selecciona el padecimiento:</h3>
            <div className="flex flex-col gap-3">
              {selectedOrgan.diseases.map((disease) => (
                <button
                  key={disease.id}
                  onClick={() => handleDiseaseClick(disease)}
                  className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 flex justify-between items-center text-left hover:border-[#1C3A70] transition-all active:scale-[0.98]"
                >
                  <span className="font-medium text-gray-800">{disease.name}</span>
                  <ChevronRight size={20} className="text-gray-400" />
                </button>
              ))}
            </div>
          </div>
        )}

        {/* VISTA 3: ESTUDIOS Y EXPLICACIONES */}
        {currentView === 'tests' && selectedDisease && (
          <div className="animate-in slide-in-from-right-8 duration-300">
            <button 
              onClick={handleBack}
              className="flex items-center text-gray-500 mb-4 hover:text-[#1C3A70] transition-colors"
            >
              <ArrowLeft size={18} className="mr-1" /> Volver a padecimientos
            </button>

            <div className="mb-6">
              <h2 className="text-2xl font-bold text-[#1C3A70] leading-tight mb-2">
                {selectedDisease.name}
              </h2>
              <p className="text-gray-600 text-sm">
                Estos son los estudios clínicos que los médicos suelen solicitar para este padecimiento. Toca uno para entender por qué.
              </p>
            </div>

            <div className="flex flex-col gap-3">
              {selectedDisease.tests.map((test, index) => {
                const isExpanded = expandedTest === index;
                return (
                  <div 
                    key={index} 
                    className={`bg-white rounded-xl shadow-sm border transition-all duration-300 overflow-hidden ${isExpanded ? 'border-[#1C3A70] ring-1 ring-[#1C3A70]' : 'border-gray-200'}`}
                  >
                    <button
                      onClick={() => setExpandedTest(isExpanded ? null : index)}
                      className="w-full p-4 flex justify-between items-start text-left"
                    >
                      <div className="pr-4">
                        <span className="text-xs font-semibold text-blue-500 uppercase tracking-wider mb-1 block">
                          {test.category}
                        </span>
                        <span className={`font-semibold ${isExpanded ? 'text-[#1C3A70]' : 'text-gray-800'}`}>
                          {test.name}
                        </span>
                      </div>
                      <div className={`mt-1 transition-transform duration-300 text-gray-400 ${isExpanded ? 'rotate-180 text-[#1C3A70]' : ''}`}>
                        <ChevronDown size={20} />
                      </div>
                    </button>
                    
                    <div 
                      className={`px-4 pb-4 text-sm text-gray-600 leading-relaxed bg-blue-50/50 transition-all duration-300 ${isExpanded ? 'block' : 'hidden'}`}
                    >
                      <div className="h-px w-full bg-gray-100 mb-3"></div>
                      <div className="flex gap-2 items-start">
                        <CheckCircle2 size={18} className="text-green-500 mt-0.5 shrink-0" />
                        <p>{test.desc}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            
            <div className="mt-8 bg-green-50 border border-green-200 rounded-xl p-4 flex gap-3">
              <Info className="text-green-600 shrink-0 mt-0.5" size={20} />
              <p className="text-sm text-green-800">
                Recuerda: Los resultados de los estudios deben ser interpretados siempre por tu médico, quien considerará tu historia clínica completa.
              </p>
            </div>
          </div>
        )}

      </main>

      {/* FOOTER */}
      <footer className="bg-white border-t border-gray-200 mt-auto">
        <div className="max-w-md mx-auto p-4 flex flex-col gap-2 text-sm text-gray-500">
          <div className="flex items-center gap-2">
            <MapPin size={16} className="text-[#1C3A70]" />
            <span>C. Vicente Guerrero N°23-A Centro Yuriria, Gto.</span>
          </div>
          <div className="flex items-center gap-2">
            <Phone size={16} className="text-[#1C3A70]" />
            <span>445-158-60-36</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
