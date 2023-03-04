FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build-env
WORKDIR /app
EXPOSE 8080

# copy csproj and restore as distinct layers
COPY "wb-file-repo.sln" "wb-file-repo.sln"
COPY "API/API.csproj" "API/API.csproj"
COPY "Core/Core.csproj" "Core/Core.csproj"
COPY "Infrastructure/Infrastructure.csproj" "Infrastructure/Infrastructure.csproj"
RUN dotnet restore "wb-file-repo.sln"

# copy everything else and build
COPY . .
WORKDIR /app
RUN dotnet publish -c Release -o out

# build runtime image
FROM mcr.microsoft.com/dotnet/aspnet:6.0
WORKDIR /app
COPY --from=build-env /app/out .
ENTRYPOINT [ "dotnet", "API.dll"]