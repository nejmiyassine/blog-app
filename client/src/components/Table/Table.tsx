import React from 'react';
import { Link } from 'react-router-dom';
import { shortText } from '../../helpers/helpers';

interface ITable {
  id: number;
  img: string;
  title: string;
  description: string;
  category: string;
}

type TableProps = ITable[];

const Table = ({ posts }: { posts: TableProps }) => {
  return (
    <div className='overflow-auto rounded-lg shadow my-4 hidden md:block'>
      <table className='w-full'>
        <thead className='rounded-md bg-gray-100 border-b-2 border-gray-200 dark:bg-gray-900 dark:border-gray-800'>
          <tr>
            <th className='w-10 p-3 text-sm font-semibold tracking-wide text-left'>
              Id
            </th>
            <th className='w-20 p-3 text-sm font-semibold tracking-wide text-left'>
              Img
            </th>
            <th className='w-40 p-3 text-sm font-semibold tracking-wide text-left'>
              Title
            </th>
            <th className='w-40 p-3 text-sm font-semibold tracking-wide text-left'>
              Description
            </th>
            <th className='w-10 p-3 text-sm font-semibold tracking-wide text-left'>
              category
            </th>
          </tr>
        </thead>
        <tbody className='divide-y divide-gray-200 dark:divide-white dark:bg-gray-700'>
          {posts &&
            posts?.map(({ id, img, title, description, category }: ITable) => (
              <tr key={id}>
                <td className='p-3 text-sm whitespace-nowrap'>{id}</td>
                <td className='p-3 text-sm whitespace-nowrap'>
                  <img
                    className='object-cover'
                    src={`./upload/${img}`}
                    alt={`${title}-${id}`}
                  />
                </td>
                <td className='p-3 text-sm whitespace-nowrap'>
                  <Link to={`/post/${id}`}>{title}</Link>
                </td>
                <td className='p-3 text-sm whitespace-nowrap'>
                  {shortText(description, 100)}
                </td>
                <td className='p-3 text-sm whitespace-nowrap'>{category}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
