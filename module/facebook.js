// export before delacration
function getFullName(name) {
  return name;
}

const CONFIG = {
  name: 'google',
}

// export { getFullName, CONFIG }; // export a list of variables, export no default

export { getFullName as getBrowser, CONFIG}  // export "as"


/* export default A
- Imports without curly braces look nicer.
- Can put any name when you use import. 
- Can’t export  default more than one in 1 file.
*/

export default function getAge(number) {
  return number;
}
