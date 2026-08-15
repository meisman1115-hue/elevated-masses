import { Suspense, lazy } from 'react'
import { Routes, Route } from 'react-router-dom'
import { Loader2 } from 'lucide-react'
import Layout from './components/Layout.jsx'
import Home from './pages/Home.jsx'
import Blog from './pages/Blog.jsx'
import BlogPost from './pages/BlogPost.jsx'
import Gear from './pages/Gear.jsx'
import Seeds from './pages/Seeds.jsx'
import Events from './pages/Events.jsx'
import Forum from './pages/Forum.jsx'
import NewThread from './pages/NewThread.jsx'
import ForumThread from './pages/ForumThread.jsx'
import Recipes from './pages/Recipes.jsx'
import RecipePost from './pages/RecipePost.jsx'
import Tutorials from './pages/Tutorials.jsx'
import TutorialPost from './pages/TutorialPost.jsx'
import Downloads from './pages/Downloads.jsx'
import PlantAI from './pages/PlantAI.jsx'
import About from './pages/About.jsx'
import Contact from './pages/Contact.jsx'
import NotFound from './pages/NotFound.jsx'

// Lazy-loaded since the map data (GeoJSON boundaries) is only needed here.
const CannabisMap = lazy(() => import('./pages/CannabisMap.jsx'))

function MapFallback() {
  return (
    <div className="container-em flex min-h-[60vh] items-center justify-center gap-2 text-muted">
      <Loader2 className="animate-spin" size={20} /> Loading the map…
    </div>
  )
}

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:slug" element={<BlogPost />} />
        <Route path="/gear" element={<Gear />} />
        <Route path="/seeds" element={<Seeds />} />
        <Route path="/events" element={<Events />} />
        <Route path="/forum" element={<Forum />} />
        <Route path="/forum/new" element={<NewThread />} />
        <Route path="/forum/:id" element={<ForumThread />} />
        <Route path="/recipes" element={<Recipes />} />
        <Route path="/recipes/:slug" element={<RecipePost />} />
        <Route path="/tutorials" element={<Tutorials />} />
        <Route path="/tutorials/:slug" element={<TutorialPost />} />
        <Route path="/downloads" element={<Downloads />} />
        <Route path="/plant-ai" element={<PlantAI />} />
        <Route
          path="/legal-map"
          element={
            <Suspense fallback={<MapFallback />}>
              <CannabisMap />
            </Suspense>
          }
        />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Layout>
  )
}
