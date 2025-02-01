export const useTheme = () => {
  const [isDark, setIsDark] = useState(() => {
    // existing theme logic
  });
  
  useEffect(() => {
    // existing theme effect
  }, [isDark]);
  
  return [isDark, setIsDark];
};
