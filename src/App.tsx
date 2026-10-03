import { Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import HomePage from './pages/HomePage'
import BlogIndex from './pages/blog/BlogIndex'
import BlogSIP from './pages/blog/BlogSIP'
import BlogHomeLoan from './pages/blog/BlogHomeLoan'
import BlogRetirement from './pages/blog/BlogRetirement'
import EmbedPage from './pages/EmbedPage'
import EMICalculator from './pages/calculators/EMICalculator'
import SIPCalculator from './pages/calculators/SIPCalculator'
import SWPCalculator from './pages/calculators/SWPCalculator'
import LumpsumCalculator from './pages/calculators/LumpsumCalculator'
import FDCalculator from './pages/calculators/FDCalculator'
import RDCalculator from './pages/calculators/RDCalculator'
import PPFCalculator from './pages/calculators/PPFCalculator'
import EPFCalculator from './pages/calculators/EPFCalculator'
import NPSCalculator from './pages/calculators/NPSCalculator'
import GratuityCalculator from './pages/calculators/GratuityCalculator'
import HRACalculator from './pages/calculators/HRACalculator'
import RentVsBuyCalculator from './pages/calculators/RentVsBuyCalculator'
import CAGRCalculator from './pages/calculators/CAGRCalculator'
import InflationCalculator from './pages/calculators/InflationCalculator'
import GSTCalculator from './pages/calculators/GSTCalculator'
import StampDutyCalculator from './pages/calculators/StampDutyCalculator'
import HomeLoanEligibilityCalculator from './pages/calculators/HomeLoanEligibilityCalculator'
import EducationLoanCalculator from './pages/calculators/EducationLoanCalculator'
import RetirementCalculator from './pages/calculators/RetirementCalculator'
import FIRECalculator from './pages/calculators/FIRECalculator'

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/blog" element={<BlogIndex />} />
        <Route path="/blog/best-sip-strategies" element={<BlogSIP />} />
        <Route path="/blog/home-loan-tips" element={<BlogHomeLoan />} />
        <Route path="/blog/retirement-planning-guide" element={<BlogRetirement />} />
        <Route path="/embed" element={<EmbedPage />} />
        <Route path="/emi-calculator" element={<EMICalculator />} />
        <Route path="/sip-calculator" element={<SIPCalculator />} />
        <Route path="/swp-calculator" element={<SWPCalculator />} />
        <Route path="/lumpsum-calculator" element={<LumpsumCalculator />} />
        <Route path="/fd-calculator" element={<FDCalculator />} />
        <Route path="/rd-calculator" element={<RDCalculator />} />
        <Route path="/ppf-calculator" element={<PPFCalculator />} />
        <Route path="/epf-calculator" element={<EPFCalculator />} />
        <Route path="/nps-calculator" element={<NPSCalculator />} />
        <Route path="/gratuity-calculator" element={<GratuityCalculator />} />
        <Route path="/hra-calculator" element={<HRACalculator />} />
        <Route path="/rent-vs-buy-calculator" element={<RentVsBuyCalculator />} />
        <Route path="/cagr-calculator" element={<CAGRCalculator />} />
        <Route path="/inflation-calculator" element={<InflationCalculator />} />
        <Route path="/gst-calculator" element={<GSTCalculator />} />
        <Route path="/stamp-duty-calculator" element={<StampDutyCalculator />} />
        <Route path="/home-loan-eligibility-calculator" element={<HomeLoanEligibilityCalculator />} />
        <Route path="/education-loan-calculator" element={<EducationLoanCalculator />} />
        <Route path="/retirement-planning-calculator" element={<RetirementCalculator />} />
        <Route path="/fire-calculator" element={<FIRECalculator />} />
      </Route>
    </Routes>
  )
}
