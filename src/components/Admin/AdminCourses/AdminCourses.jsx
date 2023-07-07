import {
        Box,
        Button,
        Grid,
        Heading,
        HStack,
        Image,
        Table,
        TableCaption,
        TableContainer,
        Tbody,
        Td,
        Th,
        Thead,
        Tr,
        useDisclosure,
      } from '@chakra-ui/react';
      import React, { useEffect, useState }  from 'react'
       import cursor from '../../../assests/images/cursor.png'
       import Sidebar from '../Sidebar'
       import { RiDeleteBin7Fill } from 'react-icons/ri'
       import CourseModal from '../CourseModal'
       import { useDispatch, useSelector } from 'react-redux'
      import toast from 'react-hot-toast';
    import { getAllCourses, getCourseLectures } from '../../../redux/actions/course';
    import { addLecture, deleteCourse, deleteLecture } from '../../../redux/actions/admin';
      
  
  const AdminCourses = () => {
    const { courses, lectures } = useSelector(state => state.course);
  
    const { loading, error, message } = useSelector(state => state.admin);
  
    const dispatch = useDispatch();
  
    const { isOpen, onClose, onOpen } = useDisclosure();
  
    const [courseId, setCourseId] = useState('');
    const [courseTitle, setCourseTitle] = useState('');
  
    const coureDetailsHandler = (courseId, title) => {
      dispatch(getCourseLectures(courseId));
      onOpen();
      setCourseId(courseId);
      setCourseTitle(title);
    };
    const deleteButtonHandler = courseId => {
      console.log(courseId);
      dispatch(deleteCourse(courseId));
    };
  
    const deleteLectureButtonHandler = async (courseId, lectureId) => {
      await dispatch(deleteLecture(courseId, lectureId));
      dispatch(getCourseLectures(courseId));
    };
  
    const addLectureHandler = async (e, courseId, title, description, video) => {
      e.preventDefault();
      const myForm = new FormData();
  
      myForm.append('title', title);
      myForm.append('description', description);
      myForm.append('file', video);
  
      await dispatch(addLecture(courseId, myForm));
      dispatch(getCourseLectures(courseId));
    };
  
    useEffect(() => {
      if (error) {
        toast.error(error);
        dispatch({ type: 'clearError' });
      }
  
      if (message) {
        toast.success(message);
        dispatch({ type: 'clearMessage' });
      }
  
      dispatch(getAllCourses());
    }, [dispatch, error, message, onClose]);
  
    return (
      <Grid
        css={{
          cursor: `url(${cursor}), default`,
        }}
        minH={'100vh'}
        templateColumns={['1fr', '5fr 1fr']}
      >
        <Box p={['0', '8']} overflowX="auto">
          <Heading
            textTransform={'uppercase'}
            children="All Courses"
            my="16"
            textAlign={['center', 'left']}
          />
  
          <TableContainer w={['100vw', 'full']}>
            <Table variant={'simple'} size="lg">
              <TableCaption>All available courses in the database</TableCaption>
  
              <Thead>
                <Tr>
                  <Th>Id</Th>
                  <Th>Poster</Th>
                  <Th>Title</Th>
                  <Th>Category</Th>
                  <Th>Creator</Th>
                  <Th isNumeric>Views</Th>
                  <Th isNumeric>Lectures</Th>
                  <Th isNumeric>Action</Th>
                </Tr>
              </Thead>
  
              <Tbody>
                {courses.map(item => (
                  <Row
                    coureDetailsHandler={coureDetailsHandler}
                    deleteButtonHandler={deleteButtonHandler}
                    key={item._id}
                    item={item}
                    loading={loading}
                  />
                ))}
              </Tbody>
            </Table>
          </TableContainer>
  
          <CourseModal
            isOpen={isOpen}
            onClose={onClose}
            id={courseId}
            courseTitle={courseTitle}
            deleteButtonHandler={deleteLectureButtonHandler}
            addLectureHandler={addLectureHandler}
            lectures={lectures}
            loading={loading}
          />
        </Box>
  
        <Sidebar />
      </Grid>
    );
  };
  
  function Row({ item, coureDetailsHandler, deleteButtonHandler, loading }) {
    return (
      <Tr>
        <Td>#{item._id}</Td>
  
        <Td>
          <Image src={item.poster.url} />
        </Td>
  
        <Td>{item.title}</Td>
        <Td textTransform={'uppercase'}>{item.category}</Td>
        <Td>{item.createdBy}</Td>
        <Td isNumeric>{item.views}</Td>
        <Td isNumeric>{item.numOfVideos}</Td>
  
        <Td isNumeric>
          <HStack justifyContent={'flex-end'}>
            <Button
              onClick={() => coureDetailsHandler(item._id, item.title)}
              variant={'outline'}
              color="purple.500"
              isLoading={loading}
            >
              View Lectures
            </Button>
  
            <Button
              onClick={() => deleteButtonHandler(item._id)}
              color={'purple.600'}
              isLoading={loading}
            >
              <RiDeleteBin7Fill />
            </Button>
          </HStack>
        </Td>
      </Tr>
    );
  }
  export default AdminCourses;
     
   
   
   
   // import {
//     Box,
//     Button,
//     Grid,
//     Heading,
//     HStack,
//     Image,
//     Table,
//     TableCaption,
//     TableContainer,
//     Tbody,
//     Td,
//     Th,
//     Thead,
//     Tr,
//     useDisclosure,
//   } from '@chakra-ui/react';
//   import React, { useEffect, useState }  from 'react'
//    import cursor from '../../../assests/images/cursor.png'
//    import Sidebar from '../Sidebar'
//    import { RiDeleteBin7Fill } from 'react-icons/ri'
//    import CourseModal from '../CourseModal'
//    import { useDispatch, useSelector } from 'react-redux'
//   import toast from 'react-hot-toast';
// import { getAllCourses, getCourseLectures } from '../../../redux/actions/course';
// import { addLecture, deleteCourse } from '../../../redux/actions/admin';
  
//   const AdminCourses = () => {
   
//     const { courses,lectures } = useSelector(state => state.course);
//     const dispatch = useDispatch();


//     const { loading, error, message } = useSelector(state => state.admin);


//     const {isOpen,onClose,onOpen} = useDisclosure('')

//     const [courseId, setCourseId] = useState('');

//     const [courseTitle, setCourseTitle] = useState('');


//     const  courseDetailsHandler =(courseId,title)=>{
//         dispatch(getCourseLectures(courseId))
//        onOpen();
//        setCourseId(courseId);
//        setCourseTitle(title)
//     }

//     const deleteButtonHandler =(courseId)=>{
//         console.log(courseId)
//         dispatch(deleteCourse(courseId))
//             }

//     const deleteLectureButtonHandler = (courseId,lectureId)=>{
// console.log(courseId);
// console.log(lectureId);
//     }
   
   
//   const addLectureHandler = async (e, courseId, title, description, video) => {
//     e.preventDefault();
//     const myForm = new FormData();

//     myForm.append('title', title);
//     myForm.append('description', description);
//     myForm.append('file', video);

//     await dispatch(addLecture(courseId, myForm));
//     dispatch(getCourseLectures(courseId));
//   };
//     useEffect(() => {
//         if (error) {
//           toast.error(error);
//           dispatch({ type: 'clearError' });
//         }
    
//         if (message) {
//           toast.success(message);
//           dispatch({ type: 'clearMessage' });
//         }
    
//         dispatch(getAllCourses());
//       }, [dispatch, error, message ]);
  
//     return (
//       <Grid
//         css={{
//           cursor: `url(${cursor}), default`,
//         }}
//         minH={'100vh'}
//         templateColumns={['1fr', '5fr 1fr']}
//       >
//         <Box p={['0', '8']} overflowX="auto">
//           <Heading
//             textTransform={'uppercase'}
//             children="All Courses"
//             my="16"
//             textAlign={['center', 'left']}
//           />
  
//           <TableContainer w={['100vw', 'full']}>
//             <Table variant={'simple'} size="lg">
//               <TableCaption>All available courses in the database</TableCaption>
  
//               <Thead>
//                 <Tr>
//                   <Th>Id</Th>
//                   <Th>Poster</Th>
//                   <Th>Title</Th>
//                   <Th>Category</Th>
//                   <Th>Creator</Th>
//                   <Th isNumeric>Views</Th>
//                   <Th isNumeric>Lectures</Th>
//                   <Th isNumeric>Action</Th>
//                 </Tr>
//               </Thead>
  
//               <Tbody>
//                 {courses.map(item => (
//                   <Row
//                     coureDetailsHandler={courseDetailsHandler}
//                     deleteButtonHandler={deleteButtonHandler}
//                     key={item._id}
//                     item={item}
//                     loading={loading}
//                   />
//                 ))}
//               </Tbody>
//             </Table>
//           </TableContainer>
  
//       <CourseModal
//        isOpen={isOpen} 
//        onClose={onClose}
//        id={courseId}
//        courseTitle={courseTitle}
//       deleteButtonHandler={deleteLectureButtonHandler}
//     addLectureHandler={addLectureHandler}
//     lectures={lectures}
//     loading={loading}
//             />

//         </Box>
  
//         <Sidebar />
//       </Grid>
//     );
//   };
  
//   function Row({ item, coureDetailsHandler, deleteButtonHandler, loading }) {
//     return (
//       <Tr>
//         <Td>#{item._id}</Td>
  
//         <Td>
//           <Image src={item.poster.url} />
//         </Td>
  
//         <Td>{item.title}</Td>
//         <Td textTransform={'uppercase'}>{item.category}</Td>
//         <Td>{item.createdBy}</Td>
//         <Td isNumeric>{item.views}</Td>
//         <Td isNumeric>{item.numOfVideos}</Td>
  
//         <Td isNumeric>
//           <HStack justifyContent={'flex-end'}>
//             <Button
//               onClick={() => coureDetailsHandler(item._id, item.title)}
//               variant={'outline'}
//               color="purple.500"
//               isLoading={loading}
//             >
//               View Lectures
//             </Button>
  
//             <Button
//               onClick={() => deleteButtonHandler(item._id)}
//               color={'purple.600'}
//               isLoading={loading}
//             >
//               <RiDeleteBin7Fill />
//             </Button>
//           </HStack>
//         </Td>
//       </Tr>
//     );
//   }
//   export default AdminCourses;
    
  
  
  
  // import { Box, Button, Grid, HStack, Heading, Image, Table, TableCaption, TableContainer, Tbody, Td, Th, Thead, Tr, useDisclosure } from '@chakra-ui/react'
// import React from 'react'
// import cursor from '../../../assests/images/cursor.png'
// import Sidebar from '../Sidebar'
// import { RiDeleteBin7Fill } from 'react-icons/ri'
// import CourseModal from '../CourseModal'
// import { useSelector } from 'react-redux'
// const AdminCourses = () => {


//     const { courses } = useSelector(state => state.course);


//     // const { loading, error, message } = useSelector(state => state.admin);


//     const {isOpen,onClose,onOpen} = useDisclosure('')

//     const  courseDetailsHandler =(userId)=>{
//        onOpen();
//     }

//     const deleteButtonHandler =(userId)=>{
//         console.log(userId)
//             }

//     const deleteLectureButtonHandler = (courseId,lectureId)=>{
// console.log(courseId);
// console.log(lectureId);
//     }
   
//     const addLectureHandler = (e,CourseId,title,description,video)=>{
//          e.preventDefault()
//     } 
            
//   return (
//     <Grid 
//     css={{
//         cursor:`url(${cursor}), default`
//     }}
//     minH={'100vh'} 
//     templateColumns={['1fr','5fr 1fr']}
    
//     >
//         <Box p={['0','8']} overflow={'auto'}>

//         <Heading textTransform={"uppercase"}
//             children="All Users"
//             my={"16"}
//             textAlign={["center","left"]}
//             />
//             <TableContainer 
//             w={['100vw','full']}
//             >
//                 <Table variant={'simple'} size={'lg'}>

//               <TableCaption>
//                 All available Courses in the database
//               </TableCaption>

//               <Thead>
//                 <Tr>
//                     <Th>Id</Th>
//                     <Th>Poster</Th>
//                     <Th>Title</Th>
//                     <Th>Category</Th>
//                     <Th>Creator</Th>
//                     <Th isNumeric>Views</Th>
//                     <Th isNumeric>Lectures</Th>
//                     <Th isNumeric>Action</Th>
//                 </Tr>
//               </Thead>

//               <Tbody>
//                        {
//                         courses.map(item=>(
//                             <Row
//                             courseDetailsHandler={courseDetailsHandler}
//                             deleteButtonHandler={deleteButtonHandler}
//                             key={item._id} item={item}/>
//                         ))
//                        }
//               </Tbody>

//                 </Table>

//             </TableContainer>
//             <CourseModal isOpen={isOpen} onClose={onClose}
//             id={"wjdhhjxjh"}
//             courseTitle="React Course"
            
//             deleteButtonHandler={deleteLectureButtonHandler}
//              addLectureHandler={addLectureHandler}
//             />

//         </Box>
//         <Sidebar/>

//     </Grid>
//   )
// }

// export default AdminCourses

// function Row({item, courseDetailsHandler,deleteButtonHandler}){
//     return(
//          <Tr>

//             <Td>#{item._id}</Td>
//             <Td>
//                 <Image src={item.poster.url}/>
//             </Td>

//             <Td>{item.title}</Td>
//             <Td textTransform={'uppercase'}>{item.category}</Td>
//             <Td>{item.createBy}</Td>

//             <Td isNumeric>{item.views}</Td>

//             <Td isNumeric>{item.numOfVideos}</Td>

//              <Td isNumeric>
//                 <HStack justifyContent={'flex-end'}>

//                     <Button 
//                     onClick={()=> courseDetailsHandler(item._id)}
//                      variant={'outline'} color={"purple.500"}>
//                         View Lectures
//                     </Button>

//                     <Button
//                      onClick={()=> deleteButtonHandler(item._id)}
//                     color={"purple.600"}>

//                         <RiDeleteBin7Fill/>
//                     </Button>

//                 </HStack>
//             </Td>
//          </Tr>
//     )
// }

 