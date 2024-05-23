<?php

namespace App\Http\Controllers;

use App\Models\Categoria;
use Illuminate\Http\Request;

class CategoriaController extends Controller
{
    function index(){
        $categorias = Categoria::all();

        return response()->json($categorias);
    }

    function getCategoriaById($id){
        $categoria = Categoria::find($id);

        return response()->json($categoria);
    }

    function crearCategoria(Request $request){

        $request->validate([
            'nombre' => 'required|string',
            'descripcion' => 'required|string'
        ]);

        $categoria = new Categoria();

        $categoria->nombre = $request->nombre;
        $categoria->descripcion = $request->descripcion;
        $categoria->save();

        return response()->json($categoria, 201);
    }

    function modificarCategoria(Request $request, $id){

        $categoria = Categoria::find($id);

        if(!$categoria){
            return response()->json(['message' => 'La categoría no existe'], 404);
        }

        $request->validate([
            'nombre' => 'required|string',
            'descripcion' => 'required|string'
        ]);

        $categoria->nombre = $request->nombre;
        $categoria->descripcion = $request->descripcion;

        $categoria->save();

        return response()->json($categoria, 200);
    }

    function eliminarCategoria($id){
        $categoria = Categoria::find($id);

        if(!$categoria){
            return response()->json(['message' => 'La categoria no existe']);
        }

        $categoria->delete();

        return response()->json(['message' => 'La categoría se eliminó'], 200);
    }
}
