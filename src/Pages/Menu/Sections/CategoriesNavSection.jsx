// import React, { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { Splide, SplideSlide } from '@splidejs/react-splide';
// import '@splidejs/react-splide/css'; // Import Splide styles
// import { setProducts, setProductsFilter } from '../../../Store/CreateSlices';
// import { Banners } from '../../page';

// const CategoriesNavSection = () => {
//     const dispatch = useDispatch();
//     const categories = useSelector(state => state.categories?.data);
//     const products = useSelector(state => state.products?.data);
//     const [activeTab, setActiveTab] = useState('All');
//     const [categoriesFilter, setCategoriesFilter] = useState([]);

//     useEffect(() => {
//         setCategoriesFilter(categories);
//     }, [categories]);

//     const handleClick = (tabName, id) => {
//         setActiveTab(tabName);
//         filterProduct(id);
//     };

//     const filterProduct = (categoryId) => {
//         if (!categoryId) {
//             dispatch(setProductsFilter(products));
//         } else {
//             const newProduct = products.filter((product) => categoryId === product.category_id);
//             dispatch(setProductsFilter(newProduct));
//         }
//     };

//     return (
//         <div className="w-screen flex flex-col items-center gap-4">

//             <Banners/>
           
//             <Splide
//                 options ={{
//                 type: 'slide',
//                 perPage: 8, // Show 4 categories at a time on large screens
//                 perMove: 2, // Move 2 at a time
//                 pagination: true,
//                 arrows: true,
//                 gap: '1rem',
//                 padding: '5%',
//                 autoplay: true,
//                 interval: 6000,
//                 pauseOnHover: true,
//                 breakpoints: {
//                     1024: { perPage:5 }, // Show 3 items on tablets
//                     768: { perPage: 4 },  // Show 2 items on smaller tablets
//                     480: { perPage: 2 } ,  // Show 1 item on mobile
//             }}}         
//                 className="w-full"
//             >
//                 {/* 'All' Category */}
//                 <SplideSlide>
//                     <div
//                         onClick={() => handleClick('All', '')}
//                         className={`w-auto min-w-28 h-auto min-h-32 transition-all ease-in-out duration-300 cursor-pointer ${
//                             activeTab === 'All' ? 'bg-mainColor text-white' : 'text-mainColor'
//                         } hover:bg-mainColor hover:text-white flex flex-col justify-center items-center gap-4 px-1 py-1 rounded-3xl`}
//                     >
//                         <div className={`w-20 h-20 rounded-full flex items-center justify-center ${activeTab === 'All' ? 'bg-white' : 'bg-mainColor'}`}>
//                             <img src="/src/assets/Images/IconNavFilter.png" className="w-20 h-20 rounded-full" alt="category" loading="lazy" />
//                         </div>
//                         <span className="text-lg">All</span>
//                     </div>
//                 </SplideSlide>

//                 {/* Category List */}
//                 {categoriesFilter.map((category, index) => (
//                     <SplideSlide key={index}>
//                         <div
//                             onClick={() => handleClick(category?.name, category?.id)}
//                             className={`w-auto min-w-28 h-auto min-h-32 transition-all ease-in-out duration-300 cursor-pointer ${
//                                 activeTab === category?.name ? 'bg-mainColor text-white' : 'text-mainColor'
//                             } hover:bg-mainColor hover:text-white flex flex-col justify-center items-center gap-4 px-1 py-1 rounded-3xl`}
//                         >
//                             <div className={`w-20 h-20 rounded-full flex items-center justify-center ${activeTab === category?.name ? 'bg-white' : 'bg-mainColor'}`}>
//                                 <img src={category.image_link} className="w-20 h-20 rounded-full" alt="category" />
//                             </div>
//                             <span className="text-lg">{category?.name || '-'}</span>
//                         </div>
//                     </SplideSlide>
//                 ))}
//             </Splide>
//         </div>
//     );
// };

// export default CategoriesNavSection;

// import React, { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { Splide, SplideSlide } from '@splidejs/react-splide';
// import '@splidejs/react-splide/css';
// import { setProductsFilter } from '../../../Store/CreateSlices';
// import { Banners } from '../../page';
// import Image from '../../../assets/Images/IconNavFilter.png'
// const CategoriesNavSection = () => {
//     const dispatch = useDispatch();
//     const categories = useSelector(state => state.categories?.data);
//     const products = useSelector(state => state.products?.data);

//     const [activeTab, setActiveTab] = useState('All');
//     const [activeSubTab, setActiveSubTab] = useState(null);
//     const [categoriesFilter, setCategoriesFilter] = useState([]);
//     const [subCategories, setSubCategories] = useState([]);
//     const [mainCategory, setMainCategory] = useState([]);

//     useEffect(() => {
//         setCategoriesFilter(categories);
//     }, [categories]);

//     const handleCategoryClick = (category) => {
//         setActiveTab(category?.name);
//         setActiveSubTab(null);
//         setMainCategory(category)
//         if (category?.sub_categories?.length > 0) {
//             setSubCategories(category.sub_categories);
//         } else {
//             setSubCategories([]);
//         }

//         filterProduct(category.id, null);
//     };

//     const handleSubCategoryClick = (subCategory) => {
//         setActiveSubTab(subCategory?.name);
//         filterProduct(subCategory.category_id, subCategory.id);
//     };

//     const filterProduct = (categoryId, subCategoryId) => {
//         let filteredProducts = products;

//         if (categoryId) {
//             filteredProducts = filteredProducts.filter(product => product.category_id === categoryId);
//         }
//         if (subCategoryId) {
//             filteredProducts =filteredProducts.filter(product => product.sub_category_id=== subCategoryId);
//         }

//         dispatch(setProductsFilter(filteredProducts));
//     };

//       // Define the "All" category object
//   const allCategory = {
//     name: 'All',
//     image_link: Image,
//   };

//   // Combine the "All" category with the rest of your categories
//   const allCategories = [allCategory, ...categoriesFilter];

//  // Utility function to group categories into groups of 2 (for two rows per slide)
//  const groupCategories = (categories, groupSize = 2) => {
//     const groups = [];
//     for (let i = 0; i < categories.length; i += groupSize) {
//       groups.push(categories.slice(i, i + groupSize));
//     }
//     return groups;
//   };

//   // Group your categories so that each slide shows two category items (i.e. two rows)
//   const groupedCategories = groupCategories(allCategories, 2);


//     return (
//         <div className="w-screen flex flex-col items-center gap-4">
//             <Banners />

//             <Splide
//                 options={{
//                     type: 'slide',
//                     perPage: 5, // Adjust this value depending on how many grouped slides you want visible
//                     perMove: 2,
//                     pagination: true,
//                     arrows: true,
//                     gap: '1rem',
//                     padding: '5%',
//                     autoplay: true,
//                     interval: 6000,
//                     pauseOnHover: true,
//                     breakpoints: {
//                     1024: { perPage: 5 },
//                     768: { perPage: 4 },
//                     480: { perPage: 4 },
//                     },
                    
//                 }}
//                 className="w-full"
//                 >
//                 {groupedCategories.map((group, groupIndex) => (
//                     <SplideSlide key={groupIndex}>
//                     <div className="grid grid-rows-2 gap-2">
//                         {group.map((category, index) => (
//                         <div
//                             key={index}
//                             onClick={() => handleCategoryClick(category)}
//                             className={`w-20 min-w-20 h-auto min-h-32 rounded-full transition-all ease-in-out duration-300 cursor-pointer ${
//                             activeTab === category?.name ? 'bg-white text-mainColor' : 'text-mainColor'
//                             } hover:bg-white hover:text-mainColor flex flex-col justify-center items-center gap-4 px-2 py-2 rounded-3xl`}
//                         >
//                             <div
//                             className={`w-20 h-20 rounded-full flex items-center justify-center ${
//                                 activeTab === category?.name ? 'bg-white' : 'bg-white'
//                             }`}
//                             >
//                             <img
//                                 src={category.image_link}
//                                 className="w-12 h-18 rounded-full"
//                                 alt="category"
//                             />
//                             </div>
//                             <span className="text-md md:text-md truncate">{category?.name || '-'}</span>
//                         </div>
//                         ))}
//                     </div>
//                     </SplideSlide>
//                 ))}
//             </Splide>

//             {subCategories.length > 0 && (
//                 <Splide
//                 options={{
//                     type: 'slide',
//                     perPage: 3, // Adjust this value depending on how many grouped slides you want visible
//                     perMove: 2,
//                     pagination: true,
//                     arrows: false,
//                     gap: '1rem',
//                     padding: '5%',
//                     autoplay: true,
//                     interval: 6000,
//                     pauseOnHover: true,
//                     breakpoints: {
//                     1024: { perPage: 3 },
//                     768: { perPage: 2 },
//                     480: { perPage: 2 },
//                     },
//                 }}
//                     className="mt-5 w-full"
//                 >
//                     {/* "All" Subcategory Tab */}
//                     <SplideSlide>
//                     <div
//                         onClick={() =>
//                         handleCategoryClick(
//                             categoriesFilter.find((cat) => cat.name === activeTab)
//                         )
//                         }
//                         className={`px-4 py-2 text-center cursor-pointer rounded-lg border text-2xl whitespace-nowrap ${
//                         !activeSubTab
//                             ? 'bg-mainColor text-white'
//                             : 'border-mainColor text-mainColor'
//                         }`}
//                     >
//                         All
//                     </div>
//                     </SplideSlide>

//                     {/* Render each subcategory as a slide */}
//                     {subCategories.map((subCategory, index) => (
//                     <SplideSlide key={index}>
//                         <div
//                         onClick={() => handleSubCategoryClick(subCategory)}
//                         className={`flex items-center justify-center gap-2 px-2 py-1 cursor-pointer rounded-lg border text-2xl whitespace-nowrap ${
//                             activeSubTab === subCategory.name
//                             ? 'bg-mainColor text-white'
//                             : 'border-mainColor text-mainColor'
//                         }`}
//                         >
//                         <div
//                             className={`w-10 h-10 rounded-full flex items-center justify-center ${
//                             activeSubTab === subCategory?.name
//                                 ? 'bg-white'
//                                 : 'bg-mainColor'
//                             }`}
//                         >
//                             <img
//                             src={subCategory.image_link}
//                             className="w-10 h-10 rounded-full"
//                             alt="subcategory"
//                             />
//                         </div>
//                         <span className='truncate'>{subCategory.name}</span>
//                         </div>
//                     </SplideSlide>
//                     ))}
//                 </Splide>
//             )}

//         </div>
//     );
// };

// export default CategoriesNavSection;


import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';
import { setProductsFilter } from '../../../Store/CreateSlices';
import { Banners } from '../../page';
import Image from '../../../assets/Images/IconNavFilter.png';

const CategoriesNavSection = () => {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.categories?.data);
  const products = useSelector((state) => state.products?.data);

  const [activeTab, setActiveTab] = useState('All');
  const [activeTabImage, setActiveTabImage] = useState(Image);
  const [activeSubTab, setActiveSubTab] = useState(null);
  const [categoriesFilter, setCategoriesFilter] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  // itemsPerSlide will be 12 on large screens (2 rows x 6 columns)
  // and 8 on small/medium screens (2 rows x 4 columns)
  const [itemsPerSlide, setItemsPerSlide] = useState(12);

  // Update categories when Redux state changes
  useEffect(() => {
    setCategoriesFilter(categories);
  }, [categories]);

  // Update itemsPerSlide based on window width
  useEffect(() => {
    const updateItemsPerSlide = () => {
      const width = window.innerWidth;
      if (width >= 1024) {
        setItemsPerSlide(12); // 2 rows x 6 columns for big screens
      } else {
        setItemsPerSlide(8); // 2 rows x 4 columns for small/medium screens
      }
    };
    updateItemsPerSlide();
    window.addEventListener('resize', updateItemsPerSlide);
    return () => window.removeEventListener('resize', updateItemsPerSlide);
  }, []);

  const handleCategoryClick = (category) => {
    setActiveTab(category?.name);
    setActiveTabImage(category.image_link)
    setActiveSubTab(null);
    if (category?.sub_categories?.length > 0) {
      setSubCategories(category.sub_categories);
    } else {
      setSubCategories([]);
    }
    filterProduct(category.id, null);
  };

  const handleSubCategoryClick = (subCategory) => {
    setActiveSubTab(subCategory?.name);
    filterProduct(subCategory.category_id, subCategory.id);
  };

  const filterProduct = (categoryId, subCategoryId) => {
    let filteredProducts = products;
    if (categoryId) {
      filteredProducts = filteredProducts.filter(
        (product) => product.category_id === categoryId
      );
    }
    if (subCategoryId) {
      filteredProducts = filteredProducts.filter(
        (product) => product.sub_category_id === subCategoryId
      );
    }
    dispatch(setProductsFilter(filteredProducts));
  };

  // Define the "All" category object
  const allCategory = {
    name: 'All',
    image_link: Image,
  };

  // Combine the "All" category with the rest of your categories
  const allCategories = [allCategory, ...categoriesFilter];

  // Group categories into chunks based on itemsPerSlide
  const groupCategoriesByChunk = (categories, chunkSize) => {
    const groups = [];
    for (let i = 0; i < categories.length; i += chunkSize) {
      groups.push(categories.slice(i, i + chunkSize));
    }
    return groups;
  };

  const groupedCategories = groupCategoriesByChunk(allCategories, itemsPerSlide);

  return (
    <div className="w-screen flex flex-col items-center gap-2">
      <Banners />

      {/* Categories Slider */}
      <div className="w-full">
        <Splide
          options={{
            type: 'slide',
            perPage: 1,
            pagination: true,
            arrows: true,
            gap: '1rem',
            autoplay: true,
            interval: 6000,
            pauseOnHover: true,
            padding: '5%',
          }}
          className="w-full"
        >
          {groupedCategories.map((group, groupIndex) => (
            <SplideSlide key={groupIndex}>
              {/* The grid uses responsive classes:
                  - "grid-cols-4" for small/medium screens
                  - "lg:grid-cols-6" for large screens */}
              <div className="w-full grid grid-cols-4 md:grid-cols-6 xl:grid-cols-8 gap-2 mb-3">
                {group.map((category, index) => (
                  <div
                    key={index}
                    onClick={() => handleCategoryClick(category)}
                    className={`
                      cursor-pointer flex mt-3 flex-col items-center justify-start pt-2 px-1 py-8 rounded-full rounded-b-full min-h-18 max-w-18 md:w-24 min-h-38 max-h-38 border transition-all duration-300 transform hover:scale-105
                      shadow-md hover:shadow-xl text-center hover:bg-mainColor hover:text-white
                      ${activeTab === category.name ? 'bg-mainColor text-white' : 'bg-white text-black'}
                    `}
                  >
                    <div className="flex justify-center mb-2 w-16 h-16 min-h-16 max-h-16 rounded-full">
                      <img
                        src={category.image_link}
                        alt="category"
                        className="w-full h-full rounded-full object-cover"
                      />
                    </div>
                    <div className="w-full text-sm font-medium truncate overflow-hidden whitespace-nowrap">
                      {category.name || '-'}
                    </div>
                  </div>
                ))}
              </div>
            </SplideSlide>
          ))}
        </Splide>
      </div>

      <div className="w-full flex gap-2 mt-6 justify-center items-center">
        <div>
        <img
          src={activeTabImage}
          alt="category"
          className="w-12 h-12 rounded-full object-cover"
        />
        </div>
        <h1 className="text-xl font-extrabold tracking-wide text-mainColor">
          {activeTab}
        </h1>
      </div>

      {/* Subcategories Slider */}
      {subCategories.length > 0 && (
        <div className="w-full">
          <Splide
            options={{
              type: 'slide',
              perPage: 3,
              perMove: 1,
              pagination: true,
              arrows: false,
              gap: '1rem',
              padding: '5%',
              autoplay: true,
              interval: 6000,
              pauseOnHover: true,
              breakpoints: {
                1024: { perPage: 3 },
                768: { perPage: 2 },
                480: { perPage: 2 },
              },
            }}
            className="w-full"
          >
            {/* "All" Subcategory Tab */}
            <SplideSlide>
              <div
                onClick={() =>
                  handleCategoryClick(
                    categoriesFilter.find((cat) => cat.name === activeTab)
                  )
                }
                className={`
                  px-4 py-2 text-center cursor-pointer rounded-lg border text-2xl whitespace-nowrap
                  ${!activeSubTab ? 'bg-mainColor text-white' : 'border-mainColor text-mainColor'}
                `}
              >
                All
              </div>
            </SplideSlide>
            {subCategories.map((subCategory, index) => (
              <SplideSlide key={index}>
                <div
                  onClick={() => handleSubCategoryClick(subCategory)}
                  className={`
                    flex items-center justify-center gap-2 px-2 py-1 cursor-pointer rounded-lg border text-2xl whitespace-nowrap
                    ${activeSubTab === subCategory.name ? 'bg-mainColor text-white' : 'border-mainColor text-mainColor'}
                  `}
                >
                  <div
                    className={`
                      w-10 h-10 rounded-full flex items-center justify-center
                      ${activeSubTab === subCategory?.name ? 'bg-white' : 'bg-mainColor'}
                    `}
                  >
                    <img
                      src={subCategory.image_link}
                      className="w-10 h-10 rounded-full"
                      alt="subcategory"
                    />
                  </div>
                  <span className="truncate">{subCategory.name}</span>
                </div>
              </SplideSlide>
            ))}
          </Splide>
        </div>
      )}
    </div>
  );
};

export default CategoriesNavSection;
