import Box from '@mui/material/Box';
import HeroSection from '../components/sections/HeroSection';
import AboutSection from '../components/sections/AboutSection';
import SkillSection from '../components/sections/SkillSection';
import ProjectsSection from '../components/sections/ProjectsSection';
import ContactSection from '../components/sections/ContactSection';

/**
 * HomePage 컴포넌트
 *
 * 5개 섹션(Hero, About, Skill, Projects, Contact)을 순차적으로 배치
 */
function HomePage() {
  return (
    <Box sx={{ width: '100%' }}>
      <HeroSection />
      <AboutSection />
      <SkillSection />
      <ProjectsSection />
      <ContactSection />
    </Box>
  );
}

export default HomePage;
