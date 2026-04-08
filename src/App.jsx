import { useState } from 'react'
import Header from './components/Header.jsx'
import Hero from './components/Hero.jsx'
import InputScreen from './components/InputScreen.jsx'
import ResultView from './components/ResultView.jsx'
import History from './components/History.jsx'

export const EXAMPLES = {
  General:  'El arrendatario se obliga a satisfacer la renta mensual pactada dentro de los cinco primeros días de cada mes, siendo de aplicación la cláusula de resolución ipso facto en caso de incumplimiento.',
  Alquiler: 'El arrendatario se obliga a satisfacer la renta mensual pactada dentro de los cinco primeros días de cada mes, siendo de aplicación la cláusula de resolución ipso facto en caso de incumplimiento. Asimismo, queda expresamente prohibida la cesión o subarriendo del inmueble sin el consentimiento fehaciente del arrendador.',
  Multa:    'Se impone sanción pecuniaria de 200 euros por infracción del artículo 91 del Reglamento General de Circulación. El interesado dispone de un plazo de veinte días naturales para abonar la sanción con reducción del 50%, o para interponer recurso de reposición ante la autoridad sancionadora.',
  Banco:    'El titular acepta las condiciones de la cuenta corriente, incluyendo la posibilidad de aplicar comisiones por mantenimiento y administración. En caso de descubierto, se aplicará el tipo de interés deudor pactado más la comisión por posiciones deudoras.',
  Laboral:  'El trabajador queda sujeto al período de prueba estipulado en el convenio colectivo. Durante dicho período, cualquiera de las partes podrá resolver la relación laboral sin preaviso ni indemnización.',
  Divorcio: 'En virtud del convenio regulador, se acuerda la custodia compartida del menor con alternancia semanal. El progenitor no custodio abonará en concepto de pensión de alimentos la cantidad mensual pactada, actualizable conforme al IPC.',
}

export default function App() {
  const [screen, setScreen]   = useState('home')
  const [filter, setFilter]   = useState('General')
  const [mode, setMode]       = useState('basico')
  const [result, setResult]   = useState(null)
  const [history, setHistory] = useState([])

  function handleResult(data) {
    setResult(data)
    setHistory(prev => [{ ...data, date: new Date().toLocaleDateString('es-ES') }, ...prev])
    setScreen('result')
  }

  function handleHistorySelect(item) {
    setResult(item)
    setScreen('result')
  }

  return (
    <div className="min-h-screen bg-[#faf7f2]">
      <Header
        onHistoryClick={() => setScreen('history')}
        onLogoClick={() => setScreen('home')}
      />

      <main>
        {screen === 'home' && (
          <>
            <Hero onStart={() => setScreen('input')} />
          </>
        )}
        {screen === 'input' && (
          <InputScreen
            filter={filter}
            setFilter={setFilter}
            mode={mode}
            setMode={setMode}
            onResult={handleResult}
            onBack={() => setScreen('home')}
          />
        )}
        {screen === 'result' && (
          <ResultView
            result={result}
            onBack={() => setScreen('input')}
          />
        )}
        {screen === 'history' && (
          <History
            items={history}
            onBack={() => setScreen('home')}
            onSelect={handleHistorySelect}
          />
        )}
      </main>
    </div>
  )
}
