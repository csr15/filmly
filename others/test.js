// server.route([
//   {
//     method: "GET",
//     path: "/",
//     config: {
//       handler: async (request, reply) => {
//         try {
//           const newMovie = await Movie.findByPk(13);

//           await newMovie.addGenre(1, {
//             through: { selfGranted: false },
//           });
//           const result = await Movie.findOne({
//             where: { id: 1 },
//             include: Actor,
//           });
//           reply("Done");
//         } catch (error) {
//           console.log(error);
//         }
//       },
//     },
//   },
// ]);
