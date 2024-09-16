import { useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import './print.css';

const PrintComponent = () => {
  const componentRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  return (
    <div>
      <button onClick={handlePrint}>Print</button>
      <div ref={componentRef} className="print-content">
        <h1>Sample Document</h1>
        <p style={{ marginLeft: '-10px' }}>
          This is a sample document to demonstrate printing in React using the react-to-print library.
        </p>
        <table>
          <thead>
            <tr>
              <th>Header 1</th>
              <th>Header 2</th>
              <th>Header 3</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Row 1, Col 1</td>
              <td>Row 1, Col 2</td>
              <td>Row 1, Col 3</td>
            </tr>
            <tr>
              <td>Row 2, Col 1</td>
              <td>Row 2, Col 2</td>
              <td>Row 2, Col 3</td>
            </tr>
            <tr>
              <td>Row 3, Col 1</td>
              <td>Row 3, Col 2</td>
              <td>Row 3, Col 3</td>
            </tr>
          </tbody>
        </table>
        <p>Additional content goes here.</p>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Placeat quaerat exercitationem obcaecati fugit,
        inventore magnam vel nobis esse consequatur mollitia pariatur dolores ipsam. Cupiditate delectus unde hic itaque
        quisquam aliquam. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptatem voluptate officia atque
        voluptates delectus vel inventore veritatis eligendi numquam non tempora soluta rerum amet, accusamus optio quod
        qui animi sint. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Tempore, repellendus ut repudiandae
        veniam nam quidem corporis modi quis animi. Ad debitis consequuntur et libero, quibusdam magnam vero excepturi
        at aliquid. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Placeat quaerat exercitationem obcaecati
        fugit, inventore magnam vel nobis esse consequatur mollitia pariatur dolores ipsam. Cupiditate delectus unde hic
        itaque quisquam aliquam. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptatem voluptate officia
        atque voluptates delectus vel inventore veritatis eligendi numquam non tempora soluta rerum amet, accusamus
        optio quod qui animi sint. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Tempore, repellendus ut
        repudiandae veniam nam quidem corporis modi quis animi. Ad debitis consequuntur et libero, quibusdam magnam vero
        excepturi at aliquid. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Placeat quaerat exercitationem
        obcaecati fugit, inventore magnam vel nobis esse consequatur mollitia pariatur dolores ipsam. Cupiditate
        delectus unde hic itaque quisquam aliquam. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptatem
        voluptate officia atque voluptates delectus vel inventore veritatis eligendi numquam non tempora soluta rerum
        amet, accusamus optio quod qui animi sint. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Tempore,
        repellendus ut repudiandae veniam nam quidem corporis modi quis animi. Ad debitis consequuntur et libero,
        quibusdam magnam vero excepturi at aliquid. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Placeat
        quaerat exercitationem obcaecati fugit, inventore magnam vel nobis esse consequatur mollitia pariatur dolores
        ipsam. Cupiditate delectus unde hic itaque quisquam aliquam. Lorem ipsum dolor sit amet consectetur, adipisicing
        elit. Voluptatem voluptate officia atque voluptates delectus vel inventore veritatis eligendi numquam non
        tempora soluta rerum amet, accusamus optio quod qui animi sint. Lorem ipsum dolor sit amet consectetur,
        adipisicing elit. Tempore, repellendus ut repudiandae veniam nam quidem corporis modi quis animi. Ad debitis
        consequuntur et libero, quibusdam magnam vero excepturi at aliquid. Lorem ipsum dolor sit amet consectetur,
        adipisicing elit. Placeat quaerat exercitationem obcaecati fugit, inventore magnam vel nobis esse consequatur
        mollitia pariatur dolores ipsam. Cupiditate delectus unde hic itaque quisquam aliquam. Lorem ipsum dolor sit
        amet consectetur, adipisicing elit. Voluptatem voluptate officia atque voluptates delectus vel inventore
        veritatis eligendi numquam non tempora soluta rerum amet, accusamus optio quod qui animi sint. Lorem ipsum dolor
        sit amet consectetur, adipisicing elit. Tempore, repellendus ut repudiandae veniam nam quidem corporis modi quis
        animi. Ad debitis consequuntur et libero, quibusdam magnam vero excepturi at aliquid. Lorem ipsum dolor sit amet
        consectetur, adipisicing elit. Placeat quaerat exercitationem obcaecati fugit, inventore magnam vel nobis esse
        consequatur mollitia pariatur dolores ipsam. Cupiditate delectus unde hic itaque quisquam aliquam. Lorem ipsum
        dolor sit amet consectetur, adipisicing elit. Voluptatem voluptate officia atque voluptates delectus vel
        inventore veritatis eligendi numquam non tempora soluta rerum amet, accusamus optio quod qui animi sint. Lorem
        ipsum dolor sit amet consectetur, adipisicing elit. Tempore, repellendus ut repudiandae veniam nam quidem
        corporis modi quis animi. Ad debitis consequuntur et libero, quibusdam magnam vero excepturi at aliquid. Lorem
        ipsum dolor sit amet consectetur, adipisicing elit. Placeat quaerat exercitationem obcaecati fugit, inventore
        magnam vel nobis esse consequatur mollitia pariatur dolores ipsam. Cupiditate delectus unde hic itaque quisquam
        aliquam. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptatem voluptate officia atque voluptates
        delectus vel inventore veritatis eligendi numquam non tempora soluta rerum amet, accusamus optio quod qui animi
        sint. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Tempore, repellendus ut repudiandae veniam nam
        quidem corporis modi quis animi. Ad debitis consequuntur et libero, quibusdam magnam vero excepturi at aliquid.
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Placeat quaerat exercitationem obcaecati fugit,
        inventore magnam vel nobis esse consequatur mollitia pariatur dolores ipsam. Cupiditate delectus unde hic itaque
        quisquam aliquam. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptatem voluptate officia atque
        voluptates delectus vel inventore veritatis eligendi numquam non tempora soluta rerum amet, accusamus optio quod
        qui animi sint. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Tempore, repellendus ut repudiandae
        veniam nam quidem corporis modi quis animi. Ad debitis consequuntur et libero, quibusdam magnam vero excepturi
        at aliquid. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Placeat quaerat exercitationem obcaecati
        fugit, inventore magnam vel nobis esse consequatur mollitia pariatur dolores ipsam. Cupiditate delectus unde hic
        itaque quisquam aliquam. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptatem voluptate officia
        atque voluptates delectus vel inventore veritatis eligendi numquam non tempora soluta rerum amet, accusamus
        optio quod qui animi sint. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Tempore, repellendus ut
        repudiandae veniam nam quidem corporis modi quis animi. Ad debitis consequuntur et libero, quibusdam magnam vero
        excepturi at aliquid. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Placeat quaerat exercitationem
        obcaecati fugit, inventore magnam vel nobis esse consequatur mollitia pariatur dolores ipsam. Cupiditate
        delectus unde hic itaque quisquam aliquam. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptatem
        voluptate officia atque voluptates delectus vel inventore veritatis eligendi numquam non tempora soluta rerum
        amet, accusamus optio quod qui animi sint. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Tempore,
        repellendus ut repudiandae veniam nam quidem corporis modi quis animi. Ad debitis consequuntur et libero,
        quibusdam magnam vero excepturi at aliquid. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Placeat
        quaerat exercitationem obcaecati fugit, inventore magnam vel nobis esse consequatur mollitia pariatur dolores
        ipsam. Cupiditate delectus unde hic itaque quisquam aliquam. Lorem ipsum dolor sit amet consectetur, adipisicing
        elit. Voluptatem voluptate officia atque voluptates delectus vel inventore veritatis eligendi numquam non
        tempora soluta rerum amet, accusamus optio quod qui animi sint. Lorem ipsum dolor sit amet consectetur,
        adipisicing elit. Tempore, repellendus ut repudiandae veniam nam quidem corporis modi quis animi. Ad debitis
        consequuntur et libero, quibusdam magnam vero excepturi at aliquid.Lorem ipsum dolor sit amet consectetur,
        adipisicing elit. Placeat quaerat exercitationem obcaecati fugit, inventore magnam vel nobis esse consequatur
        mollitia pariatur dolores ipsam. Cupiditate delectus unde hic itaque quisquam aliquam. Lorem ipsum dolor sit
        amet consectetur, adipisicing elit. Voluptatem voluptate officia atque voluptates delectus vel inventore
        veritatis eligendi numquam non tempora soluta rerum amet, accusamus optio quod qui animi sint. Lorem ipsum dolor
        sit amet consectetur, adipisicing elit. Tempore, repellendus ut repudiandae veniam nam quidem corporis modi quis
        animi. Ad debitis consequuntur et libero, quibusdam magnam vero excepturi at aliquid. Lorem ipsum dolor sit amet
        consectetur, adipisicing elit. Placeat quaerat exercitationem obcaecati fugit, inventore magnam vel nobis esse
        consequatur mollitia pariatur dolores ipsam. Cupiditate delectus unde hic itaque quisquam aliquam. Lorem ipsum
        dolor sit amet consectetur, adipisicing elit. Voluptatem voluptate officia atque voluptates delectus vel
        inventore veritatis eligendi numquam non tempora soluta rerum amet, accusamus optio quod qui animi sint. Lorem
        ipsum dolor sit amet consectetur, adipisicing elit. Tempore, repellendus ut repudiandae veniam nam quidem
        corporis modi quis animi. Ad debitis consequuntur et libero, quibusdam magnam vero excepturi at aliquid. Lorem
        ipsum dolor sit amet consectetur, adipisicing elit. Placeat quaerat exercitationem obcaecati fugit, inventore
        magnam vel nobis esse consequatur mollitia pariatur dolores ipsam. Cupiditate delectus unde hic itaque quisquam
        aliquam. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptatem voluptate officia atque voluptates
        delectus vel inventore veritatis eligendi numquam non tempora soluta rerum amet, accusamus optio quod qui animi
        sint. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Tempore, repellendus ut repudiandae veniam nam
        quidem corporis modi quis animi. Ad debitis consequuntur et libero, quibusdam magnam vero excepturi at aliquid.
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Placeat quaerat exercitationem obcaecati fugit,
        inventore magnam vel nobis esse consequatur mollitia pariatur dolores ipsam. Cupiditate delectus unde hic itaque
        quisquam aliquam. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptatem voluptate officia atque
        voluptates delectus vel inventore veritatis eligendi numquam non tempora soluta rerum amet, accusamus optio quod
        qui animi sint. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Tempore, repellendus ut repudiandae
        veniam nam quidem corporis modi quis animi. Ad debitis consequuntur et libero, quibusdam magnam vero excepturi
        at aliquid. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Placeat quaerat exercitationem obcaecati
        fugit, inventore magnam vel nobis esse consequatur mollitia pariatur dolores ipsam. Cupiditate delectus unde hic
        itaque quisquam aliquam. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptatem voluptate officia
        atque voluptates delectus vel inventore veritatis eligendi numquam non tempora soluta rerum amet, accusamus
        optio quod qui animi sint. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Tempore, repellendus ut
        repudiandae veniam nam quidem corporis modi quis animi. Ad debitis consequuntur et libero, quibusdam magnam vero
        excepturi at aliquid. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Placeat quaerat exercitationem
        obcaecati fugit, inventore magnam vel nobis esse consequatur mollitia pariatur dolores ipsam. Cupiditate
        delectus unde hic itaque quisquam aliquam. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptatem
        voluptate officia atque voluptates delectus vel inventore veritatis eligendi numquam non tempora soluta rerum
        amet, accusamus optio quod qui animi sint. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Tempore,
        repellendus ut repudiandae veniam nam quidem corporis modi quis animi. Ad debitis consequuntur et libero,
        quibusdam magnam vero excepturi at aliquid. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Placeat
        quaerat exercitationem obcaecati fugit, inventore magnam vel nobis esse consequatur mollitia pariatur dolores
        ipsam. Cupiditate delectus unde hic itaque quisquam aliquam. Lorem ipsum dolor sit amet consectetur, adipisicing
        elit. Voluptatem voluptate officia atque voluptates delectus vel inventore veritatis eligendi numquam non
        tempora soluta rerum amet, accusamus optio quod qui animi sint. Lorem ipsum dolor sit amet consectetur,
        adipisicing elit. Tempore, repellendus ut repudiandae veniam nam quidem corporis modi quis animi. Ad debitis
        consequuntur et libero, quibusdam magnam vero excepturi at aliquid. Lorem ipsum dolor sit amet consectetur,
        adipisicing elit. Placeat quaerat exercitationem obcaecati fugit, inventore magnam vel nobis esse consequatur
        mollitia pariatur dolores ipsam. Cupiditate delectus unde hic itaque quisquam aliquam. Lorem ipsum dolor sit
        amet consectetur, adipisicing elit. Voluptatem voluptate officia atque voluptates delectus vel inventore
        veritatis eligendi numquam non tempora soluta rerum amet, accusamus optio quod qui animi sint. Lorem ipsum dolor
        sit amet consectetur, adipisicing elit. Tempore, repellendus ut repudiandae veniam nam quidem corporis modi quis
        animi. Ad debitis consequuntur et libero, quibusdam magnam vero excepturi at aliquid. Lorem ipsum dolor sit amet
        consectetur, adipisicing elit. Placeat quaerat exercitationem obcaecati fugit, inventore magnam vel nobis esse
        consequatur mollitia pariatur dolores ipsam. Cupiditate delectus unde hic itaque quisquam aliquam. Lorem ipsum
        dolor sit amet consectetur, adipisicing elit. Voluptatem voluptate officia atque voluptates delectus vel
        inventore veritatis eligendi numquam non tempora soluta rerum amet, accusamus optio quod qui animi sint. Lorem
        ipsum dolor sit amet consectetur, adipisicing elit. Tempore, repellendus ut repudiandae veniam nam quidem
        corporis modi quis animi. Ad debitis consequuntur et libero, quibusdam magnam vero excepturi at aliquid. Lorem
        ipsum dolor sit amet consectetur, adipisicing elit. Placeat quaerat exercitationem obcaecati fugit, inventore
        magnam vel nobis esse consequatur mollitia pariatur dolores ipsam. Cupiditate delectus unde hic itaque quisquam
        aliquam. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptatem voluptate officia atque voluptates
        delectus vel inventore veritatis eligendi numquam non tempora soluta rerum amet, accusamus optio quod qui animi
        sint. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Tempore, repellendus ut repudiandae veniam nam
        quidem corporis modi quis animi. Ad debitis consequuntur et libero, quibusdam magnam vero excepturi at aliquid.
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Placeat quaerat exercitationem obcaecati fugit,
        inventore magnam vel nobis esse consequatur mollitia pariatur dolores ipsam. Cupiditate delectus unde hic itaque
        quisquam aliquam. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptatem voluptate officia atque
        voluptates delectus vel inventore veritatis eligendi numquam non tempora soluta rerum amet, accusamus optio quod
        qui animi sint. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Tempore, repellendus ut repudiandae
        veniam nam quidem corporis modi quis animi. Ad debitis consequuntur et libero, quibusdam magnam vero excepturi
        at aliquid. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Placeat quaerat exercitationem obcaecati
        fugit, inventore magnam vel nobis esse consequatur mollitia pariatur dolores ipsam. Cupiditate delectus unde hic
        itaque quisquam aliquam. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptatem voluptate officia
        atque voluptates delectus vel inventore veritatis eligendi numquam non tempora soluta rerum amet, accusamus
        optio quod qui animi sint. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Tempore, repellendus ut
        repudiandae veniam nam quidem corporis modi quis animi. Ad debitis consequuntur et libero, quibusdam magnam vero
        excepturi at aliquid. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Placeat quaerat exercitationem
        obcaecati fugit, inventore magnam vel nobis esse consequatur mollitia pariatur dolores ipsam. Cupiditate
        delectus unde hic itaque quisquam aliquam. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptatem
        voluptate officia atque voluptates delectus vel inventore veritatis eligendi numquam non tempora soluta rerum
        amet, accusamus optio quod qui animi sint. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Tempore,
        repellendus ut repudiandae veniam nam quidem corporis modi quis animi. Ad debitis consequuntur et libero,
        quibusdam magnam vero excepturi at aliquid. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Placeat
        quaerat exercitationem obcaecati fugit, inventore magnam vel nobis esse consequatur mollitia pariatur dolores
        ipsam. Cupiditate delectus unde hic itaque quisquam aliquam. Lorem ipsum dolor sit amet consectetur, adipisicing
        elit. Voluptatem voluptate officia atque voluptates delectus vel inventore veritatis eligendi numquam non
        tempora soluta rerum amet, accusamus optio quod qui animi sint. Lorem ipsum dolor sit amet consectetur,
        adipisicing elit. Tempore, repellendus ut repudiandae veniam nam quidem corporis modi quis animi. Ad debitis
        consequuntur et libero, quibusdam magnam vero excepturi at aliquid. Lorem ipsum dolor sit amet consectetur,
        adipisicing elit. Placeat quaerat exercitationem obcaecati fugit, inventore magnam vel nobis esse consequatur
        mollitia pariatur dolores ipsam. Cupiditate delectus unde hic itaque quisquam aliquam. Lorem ipsum dolor sit
        amet consectetur, adipisicing elit. Voluptatem voluptate officia atque voluptates delectus vel inventore
        veritatis eligendi numquam non tempora soluta rerum amet, accusamus optio quod qui animi sint. Lorem ipsum dolor
        sit amet consectetur, adipisicing elit. Tempore, repellendus ut repudiandae veniam nam quidem corporis modi quis
        animi. Ad debitis consequuntur et libero, quibusdam magnam vero excepturi at aliquid. Lorem ipsum dolor sit amet
        consectetur, adipisicing elit. Placeat quaerat exercitationem obcaecati fugit, inventore magnam vel nobis esse
        consequatur mollitia pariatur dolores ipsam. Cupiditate delectus unde hic itaque quisquam aliquam. Lorem ipsum
        dolor sit amet consectetur, adipisicing elit. Voluptatem voluptate officia atque voluptates delectus vel
        inventore veritatis eligendi numquam non tempora soluta rerum amet, accusamus optio quod qui animi sint. Lorem
        ipsum dolor sit amet consectetur, adipisicing elit. Tempore, repellendus ut repudiandae veniam nam quidem
        corporis modi quis animi. Ad debitis consequuntur et libero, quibusdam magnam vero excepturi at aliquid. Lorem
        ipsum dolor sit amet consectetur, adipisicing elit. Placeat quaerat exercitationem obcaecati fugit, inventore
        magnam vel nobis esse consequatur mollitia pariatur dolores ipsam. Cupiditate delectus unde hic itaque quisquam
        aliquam. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptatem voluptate officia atque voluptates
        delectus vel inventore veritatis eligendi numquam non tempora soluta rerum amet, accusamus optio quod qui animi
        sint. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Tempore, repellendus ut repudiandae veniam nam
        quidem corporis modi quis animi. Ad debitis consequuntur et libero, quibusdam magnam vero excepturi at aliquid.
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Placeat quaerat exercitationem obcaecati fugit,
        inventore magnam vel nobis esse consequatur mollitia pariatur dolores ipsam. Cupiditate delectus unde hic itaque
        quisquam aliquam. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptatem voluptate officia atque
        voluptates delectus vel inventore veritatis eligendi numquam non tempora soluta rerum amet, accusamus optio quod
        qui animi sint. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Tempore, repellendus ut repudiandae
        veniam nam quidem corporis modi quis animi. Ad debitis consequuntur et libero, quibusdam magnam vero excepturi
        at aliquid. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Placeat quaerat exercitationem obcaecati
        fugit, inventore magnam vel nobis esse consequatur mollitia pariatur dolores ipsam. Cupiditate delectus unde hic
        itaque quisquam aliquam. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptatem voluptate officia
        atque voluptates delectus vel inventore veritatis eligendi numquam non tempora soluta rerum amet, accusamus
        optio quod qui animi sint. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Tempore, repellendus ut
        repudiandae veniam nam quidem corporis modi quis animi. Ad debitis consequuntur et libero, quibusdam magnam vero
        excepturi at aliquid.Lorem ipsum dolor sit amet consectetur, adipisicing elit. Placeat quaerat exercitationem
        obcaecati fugit, inventore magnam vel nobis esse consequatur mollitia pariatur dolores ipsam. Cupiditate
        delectus unde hic itaque quisquam aliquam. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptatem
        voluptate officia atque voluptates delectus vel inventore veritatis eligendi numquam non tempora soluta rerum
        amet, accusamus optio quod qui animi sint. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Tempore,
        repellendus ut repudiandae veniam nam quidem corporis modi quis animi. Ad debitis consequuntur et libero,
        quibusdam magnam vero excepturi at aliquid. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Placeat
        quaerat exercitationem obcaecati fugit, inventore magnam vel nobis esse consequatur mollitia pariatur dolores
        ipsam. Cupiditate delectus unde hic itaque quisquam aliquam. Lorem ipsum dolor sit amet consectetur, adipisicing
        elit. Voluptatem voluptate officia atque voluptates delectus vel inventore veritatis eligendi numquam non
        tempora soluta rerum amet, accusamus optio quod qui animi sint. Lorem ipsum dolor sit amet consectetur,
        adipisicing elit. Tempore, repellendus ut repudiandae veniam nam quidem corporis modi quis animi. Ad debitis
        consequuntur et libero, quibusdam magnam vero excepturi at aliquid. Lorem ipsum dolor sit amet consectetur,
        adipisicing elit. Placeat quaerat exercitationem obcaecati fugit, inventore magnam vel nobis esse consequatur
        mollitia pariatur dolores ipsam. Cupiditate delectus unde hic itaque quisquam aliquam. Lorem ipsum dolor sit
        amet consectetur, adipisicing elit. Voluptatem voluptate officia atque voluptates delectus vel inventore
        veritatis eligendi numquam non tempora soluta rerum amet, accusamus optio quod qui animi sint. Lorem ipsum dolor
        sit amet consectetur, adipisicing elit. Tempore, repellendus ut repudiandae veniam nam quidem corporis modi quis
        animi. Ad debitis consequuntur et libero, quibusdam magnam vero excepturi at aliquid. Lorem ipsum dolor sit amet
        consectetur, adipisicing elit. Placeat quaerat exercitationem obcaecati fugit, inventore magnam vel nobis esse
        consequatur mollitia pariatur dolores ipsam. Cupiditate delectus unde hic itaque quisquam aliquam. Lorem ipsum
        dolor sit amet consectetur, adipisicing elit. Voluptatem voluptate officia atque voluptates delectus vel
        inventore veritatis eligendi numquam non tempora soluta rerum amet, accusamus optio quod qui animi sint. Lorem
        ipsum dolor sit amet consectetur, adipisicing elit. Tempore, repellendus ut repudiandae veniam nam quidem
        corporis modi quis animi. Ad debitis consequuntur et libero, quibusdam magnam vero excepturi at aliquid. Lorem
        ipsum dolor sit amet consectetur, adipisicing elit. Placeat quaerat exercitationem obcaecati fugit, inventore
        magnam vel nobis esse consequatur mollitia pariatur dolores ipsam. Cupiditate delectus unde hic itaque quisquam
        aliquam. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptatem voluptate officia atque voluptates
        delectus vel inventore veritatis eligendi numquam non tempora soluta rerum amet, accusamus optio quod qui animi
        sint. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Tempore, repellendus ut repudiandae veniam nam
        quidem corporis modi quis animi. Ad debitis consequuntur et libero, quibusdam magnam vero excepturi at aliquid.
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Placeat quaerat exercitationem obcaecati fugit,
        inventore magnam vel nobis esse consequatur mollitia pariatur dolores ipsam. Cupiditate delectus unde hic itaque
        quisquam aliquam. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptatem voluptate officia atque
        voluptates delectus vel inventore veritatis eligendi numquam non tempora soluta rerum amet, accusamus optio quod
        qui animi sint. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Tempore, repellendus ut repudiandae
        veniam nam quidem corporis modi quis animi. Ad debitis consequuntur et libero, quibusdam magnam vero excepturi
        at aliquid. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Placeat quaerat exercitationem obcaecati
        fugit, inventore magnam vel nobis esse consequatur mollitia pariatur dolores ipsam. Cupiditate delectus unde hic
        itaque quisquam aliquam. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptatem voluptate officia
        atque voluptates delectus vel inventore veritatis eligendi numquam non tempora soluta rerum amet, accusamus
        optio quod qui animi sint. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Tempore, repellendus ut
        repudiandae veniam nam quidem corporis modi quis animi. Ad debitis consequuntur et libero, quibusdam magnam vero
        excepturi at aliquid. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Placeat quaerat exercitationem
        obcaecati fugit, inventore magnam vel nobis esse consequatur mollitia pariatur dolores ipsam. Cupiditate
        delectus unde hic itaque quisquam aliquam. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptatem
        voluptate officia atque voluptates delectus vel inventore veritatis eligendi numquam non tempora soluta rerum
        amet, accusamus optio quod qui animi sint. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Tempore,
        repellendus ut repudiandae veniam nam quidem corporis modi quis animi. Ad debitis consequuntur et libero,
        quibusdam magnam vero excepturi at aliquid. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Placeat
        quaerat exercitationem obcaecati fugit, inventore magnam vel nobis esse consequatur mollitia pariatur dolores
        ipsam. Cupiditate delectus unde hic itaque quisquam aliquam. Lorem ipsum dolor sit amet consectetur, adipisicing
        elit. Voluptatem voluptate officia atque voluptates delectus vel inventore veritatis eligendi numquam non
        tempora soluta rerum amet, accusamus optio quod qui animi sint. Lorem ipsum dolor sit amet consectetur,
        adipisicing elit. Tempore, repellendus ut repudiandae veniam nam quidem corporis modi quis animi. Ad debitis
        consequuntur et libero, quibusdam magnam vero excepturi at aliquid.Lorem ipsum dolor sit amet consectetur,
        adipisicing elit. Placeat quaerat exercitationem obcaecati fugit, inventore magnam vel nobis esse consequatur
        mollitia pariatur dolores ipsam. Cupiditate delectus unde hic itaque quisquam aliquam. Lorem ipsum dolor sit
        amet consectetur, adipisicing elit. Voluptatem voluptate officia atque voluptates delectus vel inventore
        veritatis eligendi numquam non tempora soluta rerum amet, accusamus optio quod qui animi sint. Lorem ipsum dolor
        sit amet consectetur, adipisicing elit. Tempore, repellendus ut repudiandae veniam nam quidem corporis modi quis
        animi. Ad debitis consequuntur et libero, quibusdam magnam vero excepturi at aliquid. Lorem ipsum dolor sit amet
        consectetur, adipisicing elit. Placeat quaerat exercitationem obcaecati fugit, inventore magnam vel nobis esse
        consequatur mollitia pariatur dolores ipsam. Cupiditate delectus unde hic itaque quisquam aliquam. Lorem ipsum
        dolor sit amet consectetur, adipisicing elit. Voluptatem voluptate officia atque voluptates delectus vel
        inventore veritatis eligendi numquam non tempora soluta rerum amet, accusamus optio quod qui animi sint. Lorem
        ipsum dolor sit amet consectetur, adipisicing elit. Tempore, repellendus ut repudiandae veniam nam quidem
        corporis modi quis animi. Ad debitis consequuntur et libero, quibusdam magnam vero excepturi at aliquid. Lorem
        ipsum dolor sit amet consectetur, adipisicing elit. Placeat quaerat exercitationem obcaecati fugit, inventore
        magnam vel nobis esse consequatur mollitia pariatur dolores ipsam. Cupiditate delectus unde hic itaque quisquam
        aliquam. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptatem voluptate officia atque voluptates
        delectus vel inventore veritatis eligendi numquam non tempora soluta rerum amet, accusamus optio quod qui animi
        sint. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Tempore, repellendus ut repudiandae veniam nam
        quidem corporis modi quis animi. Ad debitis consequuntur et libero, quibusdam magnam vero excepturi at aliquid.
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Placeat quaerat exercitationem obcaecati fugit,
        inventore magnam vel nobis esse consequatur mollitia pariatur dolores ipsam. Cupiditate delectus unde hic itaque
        quisquam aliquam. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptatem voluptate officia atque
        voluptates delectus vel inventore veritatis eligendi numquam non tempora soluta rerum amet, accusamus optio quod
        qui animi sint. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Tempore, repellendus ut repudiandae
        veniam nam quidem corporis modi quis animi. Ad debitis consequuntur et libero, quibusdam magnam vero excepturi
        at aliquid. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Placeat quaerat exercitationem obcaecati
        fugit, inventore magnam vel nobis esse consequatur mollitia pariatur dolores ipsam. Cupiditate delectus unde hic
        itaque quisquam aliquam. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptatem voluptate officia
        atque voluptates delectus vel inventore veritatis eligendi numquam non tempora soluta rerum amet, accusamus
        optio quod qui animi sint. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Tempore, repellendus ut
        repudiandae veniam nam quidem corporis modi quis animi. Ad debitis consequuntur et libero, quibusdam magnam vero
        excepturi at aliquid.Lorem ipsum dolor sit amet consectetur, adipisicing elit. Placeat quaerat exercitationem
        obcaecati fugit, inventore magnam vel nobis esse consequatur mollitia pariatur dolores ipsam. Cupiditate
        delectus unde hic itaque quisquam aliquam. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptatem
        voluptate officia atque voluptates delectus vel inventore veritatis eligendi numquam non tempora soluta rerum
        amet, accusamus optio quod qui animi sint. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Tempore,
        repellendus ut repudiandae veniam nam quidem corporis modi quis animi. Ad debitis consequuntur et libero,
        quibusdam magnam vero excepturi at aliquid. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Placeat
        quaerat exercitationem obcaecati fugit, inventore magnam vel nobis esse consequatur mollitia pariatur dolores
        ipsam. Cupiditate delectus unde hic itaque quisquam aliquam. Lorem ipsum dolor sit amet consectetur, adipisicing
        elit. Voluptatem voluptate officia atque voluptates delectus vel inventore veritatis eligendi numquam non
        tempora soluta rerum amet, accusamus optio quod qui animi sint. Lorem ipsum dolor sit amet consectetur,
        adipisicing elit. Tempore, repellendus ut repudiandae veniam nam quidem corporis modi quis animi. Ad debitis
        consequuntur et libero, quibusdam magnam vero excepturi at aliquid.
      </div>
    </div>
  );
};

export default PrintComponent;
