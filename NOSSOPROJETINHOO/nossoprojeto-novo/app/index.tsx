import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

function App() {
  const [contatos, setContatos] = useState([]);
  const [editando, setEditando] = useState(null);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login">
          {(props) => <LoginScreen {...props} />}
        </Stack.Screen>
        <Stack.Screen name="Cadastro de Usuário">
          {(props) => <CadastroUsuarioScreen {...props} />}
        </Stack.Screen>
        <Stack.Screen name="Lista de Contatos">
          {(props) => (
            <ListaContatosScreen
              {...props}
              contatos={contatos}
              setEditando={setEditando}
            />
          )}
        </Stack.Screen>
        <Stack.Screen name="Cadastro de Contato">
          {(props) => (
            <CadastroContatoScreen
              {...props}
              contatos={contatos}
              setContatos={setContatos}
            />
          )}
        </Stack.Screen>
        <Stack.Screen name="Editar Contato">
          {(props) => (
            <EditarContatoScreen
              {...props}
              contato={editando}
              contatos={contatos}
              setContatos={setContatos}
            />
          )}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput style={styles.input} placeholder="Email" value={email} onChangeText={setEmail} />
      <TextInput style={styles.input} placeholder="Senha" secureTextEntry value={senha} onChangeText={setSenha} />
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Lista de Contatos')}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.button, { backgroundColor: '#999' }]} onPress={() => navigation.navigate('Cadastro de Usuário')}>
        <Text style={styles.buttonText}>Cadastre-se</Text>
      </TouchableOpacity>
    </View>
  );
}

export default  function CadastroUsuarioScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cadastro de Usuário</Text>
      <TextInput style={styles.input} placeholder="Nome" />
      <TextInput style={styles.input} placeholder="Email" />
      <TextInput style={styles.input} placeholder="Telefone" />
      <TextInput style={styles.input} placeholder="Senha" secureTextEntry />
      <TouchableOpacity style={styles.button} onPress={() => navigation.goBack()}>
        <Text style={styles.buttonText}>Salvar</Text>
      </TouchableOpacity>
    </View>
  );
}

function ListaContatosScreen({ navigation, contatos, setEditando }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Lista de Contatos</Text>
      <FlatList
        data={contatos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.contatoItem}
            onPress={() => {
              setEditando(item);
              navigation.navigate('Editar Contato');
            }}
          >
            <Text style={styles.label}>{item.nome}</Text>
            <Text>{item.telefone}</Text>
          </TouchableOpacity>
        )}
      />
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Cadastro de Contato')}>
        <Text style={styles.buttonText}>+ Adicionar Contato</Text>
      </TouchableOpacity>
    </View>
  );
}

function CadastroContatoScreen({ navigation, contatos, setContatos }) {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');

  const salvar = () => {
    const novo = { id: Date.now().toString(), nome, email, telefone };
    setContatos([...contatos, novo]);
    navigation.navigate('Lista de Contatos');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cadastro de Contato</Text>
      <TextInput style={styles.input} placeholder="Nome" value={nome} onChangeText={setNome} />
      <TextInput style={styles.input} placeholder="Email" value={email} onChangeText={setEmail} />
      <TextInput style={styles.input} placeholder="Telefone" value={telefone} onChangeText={setTelefone} />
      <TouchableOpacity style={styles.button} onPress={salvar}>
        <Text style={styles.buttonText}>Salvar</Text>
      </TouchableOpacity>
    </View>
  );
}

function EditarContatoScreen({ navigation, contato, contatos, setContatos }) {
  const [nome, setNome] = useState(contato?.nome || '');
  const [email, setEmail] = useState(contato?.email || '');
  const [telefone, setTelefone] = useState(contato?.telefone || '');

  const alterar = () => {
    const atualizados = contatos.map((c) =>
      c.id === contato.id ? { ...c, nome, email, telefone } : c
    );
    setContatos(atualizados);
    navigation.navigate('Lista de Contatos');
  };

  const excluir = () => {
    const filtrados = contatos.filter((c) => c.id !== contato.id);
    setContatos(filtrados);
    navigation.navigate('Lista de Contatos');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Editar Contato</Text>
      <TextInput style={styles.input} value={nome} onChangeText={setNome} />
      <TextInput style={styles.input} value={email} onChangeText={setEmail} />
      <TextInput style={styles.input} value={telefone} onChangeText={setTelefone} />
      <TouchableOpacity style={styles.button} onPress={alterar}>
        <Text style={styles.buttonText}>Alterar</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.button, { backgroundColor: 'red' }]} onPress={excluir}>
        <Text style={styles.buttonText}>Excluir</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: '#F5F5F5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    alignSelf: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#CCC',
    padding: 10,
    marginBottom: 12,
    borderRadius: 6,
    backgroundColor: '#FFF',
  },
  button: {
    backgroundColor: '#007BFF',
    padding: 12,
    borderRadius: 6,
    marginTop: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFF',
    fontWeight: 'bold',
  },
  contatoItem: {
    backgroundColor: '#E0E0E0',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
  },
  label: {
    fontWeight: 'bold',
  },
});
