import React from 'react';
import * as Md from 'react-icons/md';
import * as Bs from 'react-icons/bs';
import './single.scss';
import { Link } from 'react-router-dom';
import Menu from '../../components/Menu';

const Single: React.FC = () => {
  return (
    <div className='single'>
      <div className='content'>
        <img
          className='blogimg'
          src='https://images.unsplash.com/photo-1545235617-9465d2a55698?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8dXglMjBkZXNpZ258ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60'
          alt='blogimg'
        />
        <div className='user'>
          <img
            src='https://images.unsplash.com/photo-1545235617-9465d2a55698?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8dXglMjBkZXNpZ258ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60'
            alt=''
          />
          <div className='info'>
            <span>Yassine</span>
            <p>Poster 2 days ago</p>
          </div>
          <div className='icons'>
            <Link className='icon edit' to={`/write?edit=id1`}>
              <Md.MdEdit />
            </Link>
            <div className='icon delete'>
              <Bs.BsFillTrashFill />
            </div>
          </div>
        </div>
        <h2>Post Title 1</h2>
        <p>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aperiam
          dolorum iste autem, harum quibusdam incidunt itaque iure sit
          laudantium! Blanditiis quae inventore voluptas necessitatibus
          molestiae beatae optio adipisci, reiciendis et facere, modi sed porro
          quis temporibus suscipit placeat quos aliquid magnam? Repellat
          expedita et consequatur sed tenetur possimus voluptatem magni nemo,
          dolor debitis repellendus omnis maxime reiciendis qui pariatur!
          <br />
          <br />
          Ex, tempore quos, laborum, qui dolorem velit earum ab hic dolores
          laudantium quis nisi alias neque consequuntur maxime natus repellendus
          nesciunt dolor magni iusto dicta totam? Delectus quisquam, ex odio,
          asperiores harum suscipit saepe sunt illo, cum excepturi in! Repellat
          ex animi iusto totam amet autem recusandae excepturi? Facere iste
          nihil vitae accusamus sint unde alias neque aspernatur, cupiditate
          repellendus, possimus porro veritatis natus omnis.
          <br />
          <br />
          Cum non, rem sint omnis libero repudiandae ab facere doloremque qui
          repellat! Asperiores quisquam, molestias sunt, necessitatibus
          blanditiis explicabo fugiat, veritatis error et nulla tempore sequi?
          Qui ex architecto officiis! Ipsam, quis sit blanditiis molestias
          consequuntur magni corrupti fuga pariatur optio temporibus dolor
          adipisci earum sint ducimus id impedit saepe recusandae unde quidem
          corporis neque! Dignissimos perferendis libero,
          <br />
          <br />
          minima, similique quas consequuntur minus ullam consequatur quisquam
          nemo aperiam saepe quaerat corrupti! Pariatur asperiores molestiae
          aspernatur perferendis quas quo quaerat consectetur soluta earum,
          temporibus excepturi dolorem nulla eius? Consequuntur cum impedit
          possimus, reiciendis perferendis fugit reprehenderit nostrum, incidunt
          doloribus sint nihil aliquid harum vitae laudantium.
          <br />
          <br />
          Illo reiciendis necessitatibus tempore natus reprehenderit laborum
          dolore in saepe aliquid recusandae! Exercitationem, corporis totam?
          Labore quia sit officiis, ducimus eligendi magnam maiores autem vel
          quisquam! Rerum, quis asperiores totam deleniti nostrum quo recusandae
          at alias, nihil nemo quia voluptatem, voluptate quas? Sunt unde,
          tempora error dolorem, perferendis in consequuntur eaque sapiente
          ipsum placeat, deserunt ad.
          <br />
          <br />
          Voluptatibus recusandae soluta odit? Laudantium esse deserunt tenetur
          vel cupiditate maxime quaerat cumque debitis harum voluptatum animi
          doloremque, temporibus illum? Quod quia sint accusantium quibusdam
          suscipit minima sit laboriosam nesciunt omnis fugiat laudantium ex est
          nulla fuga doloremque explicabo, illo dignissimos consequatur beatae
          itaque dolorem quas facilis? Illum porro delectus mollitia, sint
          doloribus dolorum natus tempora qui laudantium dolore aperiam nulla
          tenetur exercitationem architecto minima est cupiditate alias beatae
          fuga!
          <br />
          <br />A consectetur quae necessitatibus modi animi incidunt
          praesentium quod doloremque, suscipit maiores hic! At facere est
          molestias reprehenderit omnis officiis soluta quod qui nam ipsa
          architecto, deserunt vel itaque rem explicabo animi nulla iste velit
          nisi similique odio aliquid, possimus voluptate deleniti.
          <br />
          <br />
          Perferendis quod similique expedita eligendi animi quisquam ad magnam
          a rem, eius accusamus? Quidem, magnam nemo eveniet provident porro
          nesciunt ipsam totam aut impedit accusantium voluptatum! A officiis
          eum doloremque! Beatae, amet fugiat? Excepturi sed odio esse ab quas
          eius doloremque asperiores natus, adipisci, dolorum consequatur ipsum.
          Blanditiis, facere.
          <br />
          <br />
          Unde quod eveniet voluptatum error, eum iure at laboriosam distinctio,
          veniam ducimus animi inventore tenetur! Ullam corporis, ex laboriosam
          et nemo tempora at quae vitae iure, autem a rem est illo quaerat?
          Magni eveniet laudantium accusantium eaque doloribus id ratione ipsa
          molestiae quod facilis sed laboriosam soluta dolorum, beatae
          distinctio nemo illo blanditiis voluptatum enim?
        </p>
      </div>
      <div className='menu'>
        <Menu />
      </div>
    </div>
  );
};

export default Single;
