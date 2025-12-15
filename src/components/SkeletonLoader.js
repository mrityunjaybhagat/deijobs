import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const SkeletonLoader = ({ type = 'card', count = 1 }) => {
  switch (type) {
    case 'card':
      return Array(count).fill(0).map((_, i) => (
        <div key={i} style={{ marginBottom: '10px' }}>
          <Skeleton height={200} />
          <Skeleton count={3} />
        </div>
      ));
    case 'list':
      return <Skeleton count={count} height={30} />;
    default:
      return <Skeleton count={count} />;
  }
};

export default SkeletonLoader;
