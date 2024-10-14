import { LuMoon, LuSunMedium } from 'react-icons/lu';
import { useGlobalContext } from './AppProvider';

const ThemeToggle = () => {
  const { isDarkTheme, toggleDarkTheme } = useGlobalContext()!;

  return (
    <section className='toggle-container'>
      <button className='dark-toggle' onClick={toggleDarkTheme}>
        {isDarkTheme ? <LuMoon className='toggle-icon' /> : <LuSunMedium className='toggle-icon' />}
      </button>
    </section>
  );
};

export default ThemeToggle;
