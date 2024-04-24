import { createContext ,useContext,useState} from "react";

export const MyContext = createContext();


const DataProvider = ({ children }) => {
  let [account, setAccount] = useState([]);
  
  

  return (
    <MyContext.Provider value={{account, setAccount}}>
      {children}
    </MyContext.Provider>
  );
};

export default DataProvider;

export const useData = () => {
  const context = useContext(MyContext);
  return context;
};
