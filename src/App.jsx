import { Routes, Route } from 'react-router-dom'
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
import PlantAI from './pages/PlantAI.jsx'
import About from './pages/About.jsx'
import Contact from './pages/Contact.jsx'
import NotFound from './pages/NotFound.jsx'

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
        <Route path="/plant-ai" element={<PlantAI />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Layout>
  )
}
