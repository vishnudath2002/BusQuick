// import {
//   getUser
// } from "../../application/services/userService";

// //import {  Response } from "express";



// interface AuthenticatedRequest extends Request {
//   user?: { id: string };
// }


//   // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   export const showProfile = async (req: AuthenticatedRequest, res: any) => {
//     try {
      
       
//       if (!req.user) {
//         return res.status(401).json({ error: "Unauthorized, no user data" });
//       }

//       const userId = req.user.id;
  
//       const result = await getUser(userId);

//       res.status(200).json(result);
//     } catch (err) {
//       if (err instanceof Error) {
//         res.status(400).json({ message: err.message });
//       } else {
//         console.error("An unknown error occurred:", err);
//       }
//     }
//   };


  



  
 
//   // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   export const checkUserStatus = async (req: any, res: any) => {
//     try {
//       const { userId } = req.body;
//        console.log("userId",userId)
//       if (!userId) {
//         return res.status(400).json({ message: "User ID is required" });
//       }
  
//       const user = await getUser(userId); // Fetch user data from the database
  
//       if (!user) {
//         return res.status(404).json({ message: "User not found" });
//       }
  
//       if (user.user?.isBlocked) {
//         return res.status(403).json({ message: "User is blocked" });
//       }
  
//       res.status(200).json({ message: "User is active" });
//     } catch (err) {
//       console.error("Error checking user status:", err);
//       res.status(500).json({ message: "Internal server error" });
//     }
//   };




 
