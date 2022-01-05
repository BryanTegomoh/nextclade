import os

from is_truthy import is_truthy


def configure_wasm_toolchain(config):
  """
  Adjusts variables for WebAssembly build. This will setup the Emscripten toolchain.
  """

  NEXTCLADE_EMSDK_VERSION = os.environ["NEXTCLADE_EMSDK_VERSION"]
  EMSDK_CLANG_VERSION = os.environ["EMSDK_CLANG_VERSION"]
  NEXTCLADE_EMSDK_DIR = os.path.join(config.PROJECT_ROOT_DIR, os.environ["NEXTCLADE_EMSDK_DIR"])
  NEXTCLADE_EMSDK_USE_CACHE = is_truthy(os.environ.get("NEXTCLADE_EMSDK_USE_CACHE"))
  NEXTCLADE_EMSDK_CACHE = os.path.join(
    config.PROJECT_ROOT_DIR, ".cache", ".emscripten",
    f"emsdk_cache-{NEXTCLADE_EMSDK_VERSION}"
  )

  TOOLCHAIN_ROOT_DIR = f"{NEXTCLADE_EMSDK_DIR}/upstream"
  TARGET_TRIPLET = "wasm32-unknown-emscripten"
  CONAN_CMAKE_SYSROOT = TOOLCHAIN_ROOT_DIR
  CONAN_CMAKE_FIND_ROOT_PATH = TOOLCHAIN_ROOT_DIR

  config.PATH.extend([NEXTCLADE_EMSDK_DIR, f"{TOOLCHAIN_ROOT_DIR}/bin"])
  config.LD_LIBRARY_PATH.extend([f"{TOOLCHAIN_ROOT_DIR}/lib"])

  CC = f"{TOOLCHAIN_ROOT_DIR}/bin/clang"
  CXX = f"{TOOLCHAIN_ROOT_DIR}/bin/clang++"
  AR = f"{TOOLCHAIN_ROOT_DIR}/bin/llvm-ar"
  NM = f"{TOOLCHAIN_ROOT_DIR}/bin/llvm-nm"
  RANLIB = f"{TOOLCHAIN_ROOT_DIR}/bin/llvm-ranlib"
  AS = f"{TOOLCHAIN_ROOT_DIR}/bin/llvm-as"
  STRIP = f"{TOOLCHAIN_ROOT_DIR}/bin/llvm-strip"
  LD = f"{TOOLCHAIN_ROOT_DIR}/bin/lld"
  OBJCOPY = f"{TOOLCHAIN_ROOT_DIR}/bin/llvm-objcopy"
  OBJDUMP = f"{TOOLCHAIN_ROOT_DIR}/bin/llvm-objdump"

  CHOST = f"{TARGET_TRIPLET}"
  AC_CANONICAL_HOST = TARGET_TRIPLET
  CMAKE_C_COMPILER = CC
  CMAKE_CXX_COMPILER = CXX

  COMPILER_FLAGS = "-fno-builtin-malloc -fno-builtin-calloc -fno-builtin-realloc -fno-builtin-free"
  CFLAGS = f"{COMPILER_FLAGS}"
  CXXFLAGS = f"{COMPILER_FLAGS}"
  CMAKE_C_FLAGS = f"{CFLAGS}"
  CMAKE_CXX_FLAGS = f"{CXXFLAGS}"

  CMAKE_TOOLCHAIN_FILE = f"{TOOLCHAIN_ROOT_DIR}/emscripten/cmake/Modules/Platform/Emscripten.cmake"
  CONAN_CMAKE_TOOLCHAIN_FILE = CMAKE_TOOLCHAIN_FILE

  CONAN_STATIC_BUILD_FLAGS = f"\
      {config.CONAN_STATIC_BUILD_FLAGS} \
      -s os=Emscripten \
      -s arch=wasm \
      -s compiler=clang \
      -s compiler.libcxx=libc++ \
      -s compiler.version={EMSDK_CLANG_VERSION} \
    "

  CONAN_TBB_STATIC_BUILD_FLAGS = "-o shared=False"

  NEXTCLADE_EMSCRIPTEN_COMPILER_FLAGS = " \
      -frtti \
      -fexceptions \
      --bind \
      --source-map-base './' \
      -s MODULARIZE=1 \
      -s EXPORT_ES6=1 \
      -s WASM=1 \
      -s DISABLE_EXCEPTION_CATCHING=2 \
      -s DEMANGLE_SUPPORT=1 \
      -s ALLOW_MEMORY_GROWTH=1 \
      -s MALLOC=emmalloc \
      -s ENVIRONMENT=worker \
      -s DYNAMIC_EXECUTION=0 \
    "

  BUILD_SUFFIX = f"{config.BUILD_SUFFIX}-Wasm"
  INSTALL_DIR = f"{config.PROJECT_ROOT_DIR}/packages/web/src/generated/"

  NEXTALIGN_BUILD_CLI = 0
  NEXTALIGN_BUILD_BENCHMARKS = 0
  NEXTALIGN_BUILD_TESTS = 0
  NEXTCLADE_BUILD_CLI = 0
  NEXTCLADE_BUILD_BENCHMARKS = 0
  NEXTCLADE_BUILD_TESTS = 0
  NEXTCLADE_CLI_BUILD_TESTS = 0

  # noinspection PyProtectedMember
  config_dict = config._asdict()

  return {
    **config_dict,

    "NEXTCLADE_EMSDK_CACHE": NEXTCLADE_EMSDK_CACHE,
    "NEXTCLADE_EMSDK_DIR": NEXTCLADE_EMSDK_DIR,
    "NEXTCLADE_EMSDK_USE_CACHE": NEXTCLADE_EMSDK_USE_CACHE,
    "NEXTCLADE_EMSDK_VERSION": NEXTCLADE_EMSDK_VERSION,

    "INSTALL_DIR": INSTALL_DIR,

    "AR": AR,
    "AS": AS,
    "CC": CC,
    "CXX": CXX,
    "LD": LD,
    "NM": NM,
    "OBJCOPY": OBJCOPY,
    "OBJDUMP": OBJDUMP,
    "RANLIB": RANLIB,
    "STRIP": STRIP,

    "CHOST": CHOST,
    "AC_CANONICAL_HOST": AC_CANONICAL_HOST,

    "CMAKE_CXX_COMPILER": CMAKE_CXX_COMPILER,
    "CMAKE_C_COMPILER": CMAKE_C_COMPILER,
    "CMAKE_C_FLAGS": CMAKE_C_FLAGS,
    "CMAKE_CXX_FLAGS": CMAKE_CXX_FLAGS,

    "NEXTCLADE_EMSCRIPTEN_COMPILER_FLAGS": NEXTCLADE_EMSCRIPTEN_COMPILER_FLAGS,

    "CMAKE_TOOLCHAIN_FILE": CMAKE_TOOLCHAIN_FILE,
    "CONAN_CMAKE_TOOLCHAIN_FILE": CONAN_CMAKE_TOOLCHAIN_FILE,

    "CONAN_CMAKE_SYSROOT": CONAN_CMAKE_SYSROOT,
    "CONAN_CMAKE_FIND_ROOT_PATH": CONAN_CMAKE_FIND_ROOT_PATH,

    "CONAN_STATIC_BUILD_FLAGS": CONAN_STATIC_BUILD_FLAGS,
    "CONAN_TBB_STATIC_BUILD_FLAGS": CONAN_TBB_STATIC_BUILD_FLAGS,

    "BUILD_SUFFIX": BUILD_SUFFIX,

    "NEXTALIGN_BUILD_CLI": NEXTALIGN_BUILD_CLI,
    "NEXTALIGN_BUILD_BENCHMARKS": NEXTALIGN_BUILD_BENCHMARKS,
    "NEXTALIGN_BUILD_TESTS": NEXTALIGN_BUILD_TESTS,
    "NEXTCLADE_BUILD_CLI": NEXTCLADE_BUILD_CLI,
    "NEXTCLADE_BUILD_BENCHMARKS": NEXTCLADE_BUILD_BENCHMARKS,
    "NEXTCLADE_BUILD_TESTS": NEXTCLADE_BUILD_TESTS,
    "NEXTCLADE_CLI_BUILD_TESTS": NEXTCLADE_CLI_BUILD_TESTS,
  }
