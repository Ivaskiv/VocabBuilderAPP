import { MdOutlineArrowRightAlt } from 'react-icons/md';
import Filters from '../common/Filters';
import Statistics from '../common/Statistics';
import AddWordBtn from '../common/AddWordBtn';

const Dashboard = () => {
  return (
    <div>
      <Filters />
      <Statistics />
      <div>
        <AddWordBtn />
        <a href="/training">
          Train oneself <MdOutlineArrowRightAlt />
        </a>
      </div>
    </div>
  );
};

export default Dashboard;
